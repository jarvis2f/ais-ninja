import {getLogger} from "../utils/logger";
import {OpenAIApi} from "openai";
import Anthropic from "@anthropic-ai/sdk";

const logger = getLogger("ai");

export type ApiClient = OpenAIApi | Anthropic;

export interface Caller {
  user_id?: number;
}

/**
 * Message format
 */
export interface Message {
  parentMessageId?: string;
  name?: string | null;
  role: 'user' | 'assistant' | 'system' | 'function';
  content?: string;
  created_at?: Date;
  is_history?: boolean;
}

export interface PartMessage extends Message {
  segment?: 'start' | 'text' | 'stop' | 'error' | 'function_start' | 'function_progress' | 'function_log' | 'function_stop' | 'function_error';
}

export interface FunctionCallMessage extends Message, PartMessage {
  function_call?: {
    name: string,
    arguments: string,
  }
}

export interface PluginMessage extends Message, PartMessage {
  plugins?: {
    id: string,
    name?: string,
    avatar?: string,
    function?: {
      name: string,
      description: string,
    },
    debug_info?: {
      type: string,
      content: any,
    },
  }[],
}

export interface MessageHandler<T extends Message> {
  (message: T | T[], callback: any): void;
}

export interface FinishHandler {
  (message: Message[], model: string, usedTokens: number | [number, number]): void;
}

export const DefaultDataHandler: MessageHandler<PartMessage> = (partMessages: PartMessage[] | PartMessage, callback: any) => {
  const messages = (Array.isArray(partMessages) ? partMessages : [partMessages])
    .map((message) => JSON.stringify(message))
    .join('\n\n');
  if (logger.isLevelEnabled('debug')) {
    logger.debug(`Send user data：${messages}`);
  }
  callback(null, messages + '\n\n');
}

export const DefaultStopHandler: MessageHandler<Message> = (completeMessage: Message[] | Message, callback?: any) => {
  if (logger.isLevelEnabled('debug'))
    logger.debug(`Complete data：${JSON.stringify(completeMessage)}`);
  callback && callback();
}
