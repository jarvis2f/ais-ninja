import {getLogger} from "../utils/logger";
import {Transform, TransformCallback} from "stream";
import {OpenAIClient} from "./openai";
import {AnthropicClient} from "./anthropic";
import {Token} from "../models/Token";
import {OpenAIApi} from "openai";
import Anthropic from "@anthropic-ai/sdk";
import {
  ApiClient, Caller,
  DefaultDataHandler,
  DefaultStopHandler,
  FinishHandler,
  Message,
  MessageHandler,
  PartMessage,
} from "./types";
import {GPTTokens} from "gpt-tokens";
import {SupplierClient} from "./SupplierClient";
import ApiProxy from "./ApiProxy";

const logger = getLogger("chatgpt");

export let supplierClientAgent: SupplierClientAgent;

export function initClients() {
  if (!supplierClientAgent) {
    supplierClientAgent = new SupplierClientAgent();
  }
}

export class SupplierClientAgent {

  private supplierClients = new Map<string, SupplierClient<OpenAIApi | Anthropic>>;

  constructor() {
    this.supplierClients.set(AnthropicClient.SUPPLIER, new AnthropicClient());
    this.supplierClients.set(OpenAIClient.SUPPLIER, new OpenAIClient());
    this.supplierClients.forEach((supplierClient) => {
      supplierClient.initClients().then(() => {
        logger.info(`${supplierClient.supplier} clients initialized`);
      }).catch((err) => {
        logger.error(`${supplierClient.supplier} clients initialization failed: ` + err);
      });
    })
  }

  putClient(token: Token) {
    this.supplierClients.get(token.supplier!)!.putClient(token);
  }

  removeClient(token: Token) {
    this.supplierClients.get(token.supplier!)!.removeClient(token.id);
  }

  getRandomClient(model: string, caller: Caller): [Token, ApiProxy<ApiClient>] {
    if (model.startsWith('claude')) {
      return this.supplierClients.get(AnthropicClient.SUPPLIER)!.getRandomClient(model, caller);
    } else if (model.startsWith('gpt') || model.startsWith('text') || model.startsWith('code') || model.startsWith('dall')) {
      return this.supplierClients.get(OpenAIClient.SUPPLIER)!.getRandomClient(model, caller);
    } else {
      throw new Error(`No ${model} provide.`);
    }
  }

  getAllAvailableModels(): { label: string, value: string }[] {
    let models: any[] = [];
    this.supplierClients.forEach((supplierClient) => {
      models = models.concat(supplierClient.getAvailableModels());
    });
    return models;
  }
}

export class Chat {
  protected user_id?: number;
  protected readonly options: any;
  protected messages: Message[] = [];
  protected readonly res: any;
  protected readonly parentMessageId: string;
  protected finishedHandlers: FinishHandler[] = [];

  constructor(res: any, options: any, parentMessageId: string, historyMessages: Message[] = []) {
    this.res = res;
    this.options = options;
    this.parentMessageId = parentMessageId;
    this.messages = historyMessages;
  }

  add_finish_handler(handler: FinishHandler) {
    this.finishedHandlers.push(handler);
    return this;
  }

  set_user_id(user_id: number) {
    this.user_id = user_id;
    return this;
  }

  /**
   * Convert messages to custom format
   * @param messages
   */
  convert_custom(messages: Message[] = this.messages): any {
    return [];
  }

  /**
   * Convert messages to supplier format
   * @param supplier_messages
   */
  convert_supplier(supplier_messages: any[]): Message[] {
    return [];
  }

  async chat(message: Message): Promise<void> {
    this.messages.push(message);
  }

  stop_handler: MessageHandler<Message> = (completeMessage: Message[] | Message, callback?: any) => {
    if (logger.isLevelEnabled('debug'))
      logger.debug(`Complete data：${JSON.stringify(completeMessage)}`);

    this.messages.push(...(Array.isArray(completeMessage) ? completeMessage : [completeMessage])
      .filter((message) => {
        return message.content && message.content.length > 0;
      })
    );
    const tokens = this.calculate_usage();
    if (this.finishedHandlers.length > 0) {
      this.finishedHandlers.forEach((handler) => {
        handler(this.messages, this.options.model, tokens);
      });
    }
    callback && callback();
  }

  /**
   * calculate token usage
   */
  calculate_usage(): [number, number] {
    let model = this.options.model;
    if (model.startsWith('claude')) {
      model = model.includes('100k') ? 'gpt-3.5-turbo' : 'gpt-4';
    }
    const token_messages = this.messages
      .filter((message) => message.content && message.content.length > 0)
      .map((message) => {
      return {
        name: message.name || '',
        content: message.content!,
        role: message.role === 'function' ? 'user' : message.role
      };
    });
    if (token_messages.length === 0) return [0, 0];
    // Calculate token usage based on input and output respectively
    const input = new GPTTokens({
      model: model,
      messages: [
        ...token_messages.filter((message) => message.role === 'user'),
      ]
    }).usedTokens;
    const output = new GPTTokens({
      model: model,
      messages: [
        ...token_messages.filter((message) => message.role === 'assistant'),
      ]
    }).usedTokens;
    return [input, output];
  }

  res_error(error: any) {
    this.res_write({
      parentMessageId: this.parentMessageId,
      role: 'assistant',
      segment: 'error',
      content: error.message || error.toString(),
    });
  }

  res_write<T extends Message>(message: T) {
    if (this.res.finished || !message) return
    if (!this.res.headersSent) {
      this.res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
    }
    let text = JSON.stringify(message);
    if (logger.isLevelEnabled('debug')) {
      logger.debug(`Send user data：${text}`);
    }
    this.res.write(`\n\n${text}\n\n`);
  }
}

export class ChatTransform<T extends Message> extends Transform {
  protected readonly dataHandler: MessageHandler<PartMessage>;
  protected readonly stopHandler: MessageHandler<Message>;
  protected completed_message: T = {content: ''} as T
  protected stop = false;
  protected caches: string = '';
  protected function_call = false;

  constructor(dataHandler: MessageHandler<PartMessage> = DefaultDataHandler,
              stopHandler: MessageHandler<Message> = DefaultStopHandler) {
    super({objectMode: true});
    this.dataHandler = dataHandler;
    this.stopHandler = stopHandler;
  }

  parse(data: string): any | null {
    let message: any = null;
    try {
      message = JSON.parse(data);
    } catch (e) {
      if (this.caches !== '') {
        try {
          this.caches = this.caches + data;
          message = JSON.parse(this.caches);
          this.caches = '';
        } catch (e) {
          return;
        }
      } else {
        this.caches = data;
        return;
      }
    }
    return message;
  }

  part(message: T) {
    message.role && (this.completed_message.role = message.role);
    message.content && (this.completed_message.content += message.content);
  }

  async part_end(messages: PartMessage[], callback: TransformCallback) {
    let is_callback = false;

    if (messages.length > 0 && !this.function_call) {
      await this.dataHandler(messages, callback);
      is_callback = true;
    }

    if (this.stop) {
      await this.stopHandler(this.completed_message, is_callback ? undefined : callback);
      is_callback = true;
    }

    !is_callback && callback();
  }

  _destroy(error: Error | null, callback: (error: (Error | null)) => void) {
    super._destroy(error, callback);
  }
}

