import {ChatCompletionFunctions} from "openai";
import {Transform, TransformCallback} from "stream";
import {getLogger} from "../../utils/logger";
import {createPlugin} from "./plugins";
import {Plugin} from "../../models/Plugin";
import utils from "../../utils";
import {randomUUID} from "crypto";
import {Chat, ChatTransform, supplierClientAgent} from "../index";
import {Token} from "../../models/Token";
import ApiResponse from "../../utils/response";
import {DefaultDataHandler, FunctionCallMessage, Message, MessageHandler, PartMessage, PluginMessage} from "../types";
import OpenAIApiProxy from "./OpenAIApiProxy";

const logger = getLogger("openai");

export class OpenAIChat extends Chat {
  private available_functions?: ChatCompletionFunctions[];
  private plugins: Plugin[] = [];
  private debug: boolean = false;
  private finished: boolean = false;

  constructor(res: any, options: any, parentMessageId: string, historyMessages: Message[]) {
    super(res, options, parentMessageId, historyMessages);
  }

  convert_custom(messages: Message[] = this.messages): any {
    return messages.map((message) => {
      return {
        name: message.name,
        content: message.content,
        role: message.role
      }
    });
  }

  convert_supplier(supplier_messages: any[]): Message[] {
    return super.convert_supplier(supplier_messages);
  }

  async chat(message: Message) {
    await super.chat(message);
    const [_, openai] = supplierClientAgent.getRandomClient(this.options.model, this.user_id!) as [Token, OpenAIApiProxy];
    let response = await openai.createChatCompletion({
      messages: this.convert_custom(),
      functions: this.available_functions,
      ...this.options
    }, {
      responseType: 'stream',
      transformRequest: [(data, headers) => {
        if (logger.isLevelEnabled('debug')) {
          if (headers) {
            for (const [key, value] of Object.entries(headers)) {
              logger.debug("OpenAI Request Headers: " + key + ": " + utils.defaultInspect(value));
            }
          }
          logger.debug("OpenAI Request: " + data);
        }
        return data;
      }],
      transformResponse: [(data) => {
        if (logger.isLevelEnabled('debug'))
          logger.debug("OpenAI Response: " + data);
        return data;
      }]
    }).catch((error) => {
      logger.error("OpenAI Error: " + error.stack);
      return error.response;
    });
    if (!response) {
      this.res.json(ApiResponse.server_error());
      return;
    }
    if (response?.status !== 200) {
      response?.data?.pipe(this.getErrorTransform())
      return;
    }
    response.data?.pipe(new OpenAIChatTransform(this.openai_stop_handler)).pipe(this.res, {end: false});
  }

  openai_stop_handler: MessageHandler<FunctionCallMessage> = async (completeMessage: FunctionCallMessage[] | FunctionCallMessage, callback?: any) => {
    const message = completeMessage instanceof Array ? completeMessage[0] : completeMessage;
    if (message.function_call && message.function_call.name !== '') {
      const function_response = await this.call_function(message.function_call).catch((error) => {
        this.finished = true;
        this.res_error(error);
        return null;
      });
      if (function_response === null || function_response === '') {
        this.res_error('无法查询到信息')
        callback && callback();
        this.finished = true;
        return;
      }
      await this.chat({
        role: 'function',
        name: message.function_call.name,
        content: JSON.stringify(function_response),
      });
    }
    this.stop_handler(completeMessage, callback);
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
      created_at: new Date,
      role: 'assistant',
      segment: 'function_start',
      plugins: [{
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
      }],
    } as PluginMessage);
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
        progress: (content: string) => {
          logger.debug(`Plugin progress：${content}`);
          this.res_function_progress(call_id, content);
        }
      }).run(function_name, function_call.arguments);
      logger.debug(`Plugin returns：${utils.defaultInspect(function_response)}`);
      this.res_function_log(call_id, 'function_response', function_response, 'function_stop');
      return function_response;
    } catch (e) {
      this.res_function_log(call_id, 'function_error', (e as Error).message, 'function_error');
      return Promise.reject(e);
    }
  }

  res_function_progress(call_id: string, progress: string) {
    this.res_write({
      parentMessageId: this.parentMessageId,
      role: 'assistant',
      segment: 'function_progress',
      plugins: [{
        id: call_id,
        progress: [progress]
      },]
    })
  }

  res_function_log(call_id: string, debug_type: string, debug_content: string, segment: string = 'function_log') {
    this.res_write({
      parentMessageId: this.parentMessageId,
      role: 'assistant',
      segment: segment,
      plugins: [{
        id: call_id,
        debug_info: {
          type: debug_type,
          content: debug_content,
        }
      }]
    })
  };

}

class OpenAIChatTransform extends ChatTransform<FunctionCallMessage> {

  constructor(stopHandler: MessageHandler<Message>) {
    super(DefaultDataHandler, stopHandler);
    this.completed_message = {
      role: 'assistant',
      content: '',
      function_call: {name: '', arguments: ''},
    }
  }

  async _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    const messages: PartMessage[] = [];
    const buffer = Buffer.from(chunk).toString();
    buffer.toString()
      .split(/\n{2}/g)
      .map((item) => item.trim().replace(/^data: /, ''))
      .filter((item) => item !== '')
      .forEach((item) => {
        const message: FunctionCallMessage = {
          function_call: {name: '', arguments: ''},
          content: '',
          segment: 'text',
          role: 'assistant'
        };
        if (item === '[DONE]') {
          message.segment = 'stop';
          this.stop = true;
        } else {
          item = super.parse(item);
          if (!item) return;
          // @ts-ignore
          message.id = item.id || '';
          // @ts-ignore
          message.content = item.choices?.[0]?.delta?.content || '';
          // @ts-ignore
          message.function_call.name = item.choices?.[0]?.delta?.function_call?.name || '';
          // @ts-ignore
          message.function_call.arguments = item.choices?.[0]?.delta?.function_call?.arguments || '';
          // @ts-ignore
          message.segment = item.choices?.[0]?.delta?.role === 'assistant' ? 'start' : 'text';

          if (!this.function_call)
            // @ts-ignore
            this.function_call = message.function_call?.name !== '';
        }
        this.part(message);
        messages.push(message);
      });

    await super.part_end(messages, callback);
  }

  part(message: FunctionCallMessage) {
    super.part(message);
    this.completed_message.function_call!.name! += message.function_call?.name || '';
    this.completed_message.function_call!.arguments! += message.function_call?.arguments || '';
  }
}
