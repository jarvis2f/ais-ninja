import Anthropic from "@anthropic-ai/sdk";
import {
  Chat,
  ChatTransform,
  supplierClientAgent
} from "../index";
import {TransformCallback} from "stream";
import {getLogger} from "../../utils/logger";
import {Token} from "../../models/Token";
import CompletionCreateParams = Anthropic.CompletionCreateParams;
import {DefaultDataHandler, Message, MessageHandler, PartMessage} from "../types";
import {AnthropicProxy} from "./AnthropicProxy";

const logger = getLogger("anthropic");

export class AnthropicChat extends Chat {

  constructor(res: any, options: any, parentMessageId: string, historyMessages: Message[]) {
    super(res, options, parentMessageId, historyMessages);
  }

  convert_custom(messages: Message[] = this.messages): any {
    return this.messages.map((message) => {
      const prefix = message.role === 'user' ? 'Human: ' : 'Assistant: ';
      return `${prefix}: ${message.content}`;
    }).join('\n\n') + "\\n\\nAssistant: ";
  }

  convert_supplier(supplier_messages: any[]): Message[] {
    return super.convert_supplier(supplier_messages);
  }

  async chat(message: Message) {
    await super.chat(message);
    const [_, anthropic] = supplierClientAgent.getRandomClient(this.options.model, this.user_id!) as [Token, AnthropicProxy];
    const response = await anthropic.createCompletions({
      max_tokens_to_sample: 256,
      ...this.options,
      stream: true,
      prompt: this.convert_custom(),
    } as CompletionCreateParams.CompletionRequestStreaming, {}).catch((err) => {
      logger.error(err);
      this.res_error(err)
      return null;
    });
    response?.response?.body?.pipe(new AnthropicChatTransform(this.stop_handler)).pipe(this.res);
  }

}

class AnthropicChatTransform extends ChatTransform<Message> {

  private first = true;

  constructor(stopHandler: MessageHandler<Message>) {
    super(DefaultDataHandler, stopHandler);
  }

  async _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): Promise<void> {
    const messages: PartMessage[] = [];
    const buffer = Buffer.from(chunk).toString();
    buffer.split('\r\n\r\n').forEach((line) => {
      if (logger.isLevelEnabled('debug')) {
        logger.debug(line);
      }
      if (line.startsWith('event: ping')) {
        return;
      }
      if (line.startsWith('event: completion') && line.split('data: ')[1]) {
        const data = super.parse(line.split('data: ')[1]);
        if (!data) return;
        const message: PartMessage = {
          role: 'assistant',
          content: data.completion,
          segment: this.first ? 'start' : 'text',
        };
        if (data.stop_reason === 'stop_sequence') {
          message.segment = 'stop';
          super.stop = true;
        }
        messages.push(message);
        super.part(message);
        this.first && (this.first = false);
      }
      if (line.startsWith('event: error')) {
        logger.error(line);
      }
    });

    await super.part_end(messages, callback);
  }

}
