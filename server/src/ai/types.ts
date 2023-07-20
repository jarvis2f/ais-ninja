import {getLogger} from "../utils/logger";
import {OpenAIApi} from "openai";
import Anthropic from "@anthropic-ai/sdk";
import {StabilityRestAPI} from "./stability/StabilityRestAPI";

const logger = getLogger("ai");

export type ApiClient = OpenAIApi | Anthropic | StabilityRestAPI;

export interface Caller {
  user_id?: number;
  api_key_id?: number;
}

export interface MixModel {
  name: string;
  model: string;
  supplier: string;
  type: 'text' | 'image' | 'video';
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
  (message: Message[], model: string): void;
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
