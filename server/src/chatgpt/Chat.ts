import {ChatCompletionRequestMessage, ChatCompletionResponseMessage} from "openai/api";
import {ChatCompletionFunctions, ChatCompletionRequestMessageRoleEnum} from "openai";
import {Transform} from "stream";
import dayjs from "dayjs";
import {getLogger} from "../utils/logger";
import {getRandomClient} from "./index";
import {createPlugin} from "./plugins";
import {Plugin} from "../models/Plugin";
import utils from "../utils";
import {randomUUID} from "crypto";

const logger = getLogger("openai");

export class Chat {
  private messages: ChatCompletionRequestMessage[];
  private options: any;
  private readonly res: any;
  private readonly parentMessageId: number;
  private available_functions?: ChatCompletionFunctions[];
  private plugins: Plugin[] = [];
  private debug: boolean = false;
  private chatCompletions: ChatCompletionResponseMessage[] = [];
  private finished_callbacks: ((chatCompletions: ChatCompletionResponseMessage[]) => void)[] = [];

  private finished: boolean = false;

  constructor(historyMessages: ChatCompletionRequestMessage[], options: any, res: any, parentMessageId: number) {
    this.messages = historyMessages;
    this.options = options;
    this.res = res;
    this.parentMessageId = parentMessageId;
  }

  async chat(message: ChatCompletionRequestMessage) {
    const [_, openai] = getRandomClient(this.options.model);
    this.messages.push(message);
    let response = await openai.createChatCompletion({
      messages: this.messages,
      functions: this.available_functions,
      ...this.options
    }, {
      responseType: 'stream',
      transformRequest: [(data, headers) => {
        if (logger.isLevelEnabled('debug')) {
          logger.debug("OpenAI Request: " + data);
          if (headers) {
            for (const [key, value] of Object.entries(headers)) {
              logger.debug("OpenAI Request Headers: " + key + ": " + utils.defaultInspect(value));
            }
          }
        }
        return data;
      }],
      transformResponse: [(data) => {
        if (logger.isLevelEnabled('debug'))
          logger.debug("OpenAI Response: " + data);
        return data;
      }]
    }).catch((error) => {
      logger.error("OpenAI Error: " + error.toJSON());
      return error.response;
    });
    if (response?.status !== 200) {
      response.data?.pipe(this.getErrorTransform())
      return;
    }
    if (!this.res.headersSent) {
      this.res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
    }
    response.data?.pipe(this.getTransform()).pipe(this.res, {end: false});
  }

  getErrorTransform() {
    let self = this;
    let transform = new Transform({
      objectMode: true,
      transform: (chunk: Buffer | string, encoding: string, callback: () => void) => {
        let data: any;
        try {
          data = JSON.parse(chunk.toString());
          data = data.error?.message;
        } catch (e) {
          data = chunk.toString();
        }
        self.res_error(data);
        callback();
      }
    });
    transform.on('error', (error) => {
      logger.error(`Error Transform Error: ${error}`);
      self.res_error(error);
    });
    return transform;
  }

  getTransform() {
    let self = this;
    let transform = new Transform({
      objectMode: true,
      destroy(error: Error | null, callback: (error: Error | null) => void) {
        if (self.finished && self.finished_callbacks.length > 0) {
          self.finished_callbacks.forEach((callback) => {
            callback(self.chatCompletions);
          });
        }

        callback(error);
      },
      transform: ChatMessageTransform(
        (partMessages: PartMessage[], callback: any) => {
          const messages = partMessages
            .map((message) => {
              return JSON.stringify({
                // id: message.id,
                role: message.role,
                segment: message.segment,
                dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                content: message.content,
                parentMessageId: this.parentMessageId,
              });
            })
            .join('\n\n');
          if (logger.isLevelEnabled('debug')) {
            logger.debug(`Send user data：${messages}`);
          }
          callback(null, messages + '\n\n');
        },
        async (completeMessage: any, callback?: any) => {
          if (logger.isLevelEnabled('debug'))
            logger.debug(`Complete data：${JSON.stringify(completeMessage)}`);
          this.chatCompletions.push(completeMessage);
          if (completeMessage.function_call && completeMessage.function_call.name !== '') {
            const function_response = await this.call_function(completeMessage.function_call).catch((error) => {
              this.finished = true;
              callback && callback(error);
              return null;
            });
            if (function_response === null) return;
            await this.chat({
              role: ChatCompletionRequestMessageRoleEnum.Function,
              name: completeMessage.function_call.name,
              content: JSON.stringify(function_response),
            });
          } else {
            this.finished = true;
          }
        }
      ),
    });
    transform.on('error', (error) => {
      logger.error(`Transform Error: ${error}`);
      self.res_error(error);
    })
    return transform;
  }

  init_functions(plugins: Plugin[]): this {
    if (plugins.length === 0) return this;
    this.plugins = plugins;
    this.available_functions = plugins.flatMap((plugin) => {
      return plugin?.functions?.map((func) => {
        return {
          name: `${plugin.id}__${func.name}`,
          description: func.description,
          parameters: JSON.parse(func.parameters),
        };
      });
    }).filter((func) => func !== undefined) as ChatCompletionFunctions[];
    return this;
  }

  setDebug(debug: boolean) {
    this.debug = debug;
    return this;
  }

  add_finish_callback(callback: (chatCompletions: ChatCompletionResponseMessage[]) => void) {
    this.finished_callbacks.push(callback);
    return this;
  }

  async call_function(function_call: { name: string; arguments: string }): Promise<string> {
    const plugin_id = Number(function_call.name.split('__')[0]);
    const plugin = this.plugins.find((plugin) => plugin.id === plugin_id);
    if (!plugin) {
      return Promise.reject(`Plugin not found: ${plugin_id}`);
    }
    const function_name = function_call.name.split('__')[1];
    let func = plugin.functions?.find((func) => func.name === function_name);
    if (!func) {
      return Promise.reject(`Function not found: ${function_name}`);
    }
    const call_id = randomUUID();
    this.res_write({
      parentMessageId: this.parentMessageId,
      dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      segment: 'function_start',
      plugin: {
        id: call_id,
        name: plugin.name,
        avatar: plugin.avatar,
        function: {
          name: function_name,
          description: func.description,
        },
        debug_info: {
          type: 'function_call',
          content: function_call,
        },
      },
    });
    try {
      let variables: { [key: string]: string } = {};
      if (plugin.variables && plugin.variables !== '') {
        JSON.parse(plugin.variables).forEach((variable: { name: string; value: string }) => {
          variables[variable.name] = variable.value;
        });
      }
      const function_response = await createPlugin(func!.script, {
        debug: this.debug,
        env: variables,
        log: (...args: any[]) => {
          logger.debug(`Plugin log：${args.join(' ')}`);
          this.res_function_log(call_id, 'function_log', args.join(' '));
        },
      }).run(function_name, function_call.arguments);
      logger.debug(`Plugin returns：${utils.defaultInspect(function_response)}`);
      this.res_function_log(call_id, 'function_response', function_response, 'function_stop');
      return function_response;
    } catch (e) {
      this.res_function_log(call_id, 'function_error', (e as Error).message, 'function_error');
      return Promise.reject(e);
    }
  }

  res_function_log(call_id: string, debug_type: string, debug_content: string, segment: string = 'function_log') {
    this.res_write({
      parentMessageId: this.parentMessageId,
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      segment: segment,
      plugin: {
        id: call_id,
        debug_info: {
          type: debug_type,
          content: debug_content,
        }
      },
    })
  };

  res_error(error: any) {
    this.res_write({
      parentMessageId: this.parentMessageId,
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      segment: 'error',
      content: error.message || error.toString(),
    });
  }

  res_write(obj: any) {
    if (this.res.finished || !obj) return
    if (!this.debug) {
      delete obj?.plugin?.debug_info;
    }
    let message = JSON.stringify(obj);
    if (logger.isLevelEnabled('debug')) {
      logger.debug(`Send user data：${message}`);
    }
    this.res.write(`\n\n${message}\n\n`);
  }
}

type DataHandler = (partMessages: PartMessage[], callback: () => void) => void;
type StopHandler = (completeMessage: ChatCompletionResponseMessage, callback?: () => void) => void;

interface PartMessage extends ChatCompletionResponseMessage {
  segment: 'start' | 'function' | 'text' | 'stop';
}

function ChatMessageTransform(dataHandler: DataHandler, stopHandler: StopHandler) {
  const completeMessage: ChatCompletionResponseMessage = {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content: '',
    function_call: {
      name: '',
      arguments: '',
    },
  };
  let caches = '';
  let function_call = false;

  return async (chunk: Buffer | string, encoding: string, callback: () => void) => {
    const buffer = Buffer.from(chunk).toString();
    const partMessages: PartMessage[] = [];
    let stop = false;

    buffer.toString()
      .split(/\n{2}/g)
      .map((item) => item.trim().replace(/^data: /, ''))
      .filter((item) => item !== '')
      .forEach((item) => {
        const partMessage: PartMessage = {
          function_call: {name: '', arguments: ''},
          content: '',
          segment: 'text',
          role: ChatCompletionRequestMessageRoleEnum.Assistant
        };

        if (item === '[DONE]') {
          partMessage.segment = 'stop';
          stop = true;
        } else {
          try {
            item = JSON.parse(item);
          } catch (e) {
            if (caches !== '') {
              try {
                caches = caches + item;
                item = JSON.parse(caches);
                caches = '';
              } catch (e) {
                return;
              }
            } else {
              caches = item;
              return;
            }
          }
          // @ts-ignore
          partMessage.id = item.id || '';
          // @ts-ignore
          partMessage.content = item.choices?.[0]?.delta?.content || '';
          // @ts-ignore
          partMessage.function_call.name = item.choices?.[0]?.delta?.function_call?.name || '';
          // @ts-ignore
          partMessage.function_call.arguments = item.choices?.[0]?.delta?.function_call?.arguments || '';
          // @ts-ignore
          partMessage.segment = item.choices?.[0]?.delta?.role === 'assistant' ? 'start' : 'text';

          if (!function_call)
            // @ts-ignore
            function_call = partMessage.function_call?.name || partMessage.function_call?.arguments;

          completeMessage.content! += partMessage.content;
          completeMessage.function_call!.name! += partMessage.function_call?.name;
          completeMessage.function_call!.arguments! += partMessage.function_call?.arguments;
        }

        partMessages.push(partMessage);
      });

    let is_callback = false;

    if (partMessages.length > 0 && !function_call) {
      await dataHandler(partMessages, callback);
      is_callback = true;
    }

    if (stop) {
      await stopHandler(completeMessage, is_callback ? undefined : callback);
      is_callback = true;
    }

    !is_callback && callback();
  };
}
