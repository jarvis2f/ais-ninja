import {Token} from "../../models/Token";
import Anthropic from "@anthropic-ai/sdk";
import {SupplierClient} from "../SupplierClient";

export class AnthropicClient extends SupplierClient<Anthropic> {

  public static SUPPLIER: string = 'anthropic';

  constructor() {
    super(AnthropicClient.SUPPLIER);
  }

  buildClient(token: Token): Anthropic {
    return new Anthropic({
      apiKey: token.key,
      baseURL: token.host,
    });
  }

  getAvailableModels(): { label: string; value: string }[] {
    return available_models;
  }
}

const available_models = [
  {
    label: 'claude-1',
    value: 'claude-1'
  },
  {
    label: 'claude-1-100k',
    value: 'claude-1-100k'
  },
  {
    label: 'claude-instant-1',
    value: 'claude-instant-1'
  },
  {
    label: 'claude-instant-1-100k',
    value: 'claude-instant-1-100k'
  },
  {
    label: 'claude-1.3',
    value: 'claude-1.3'
  },
  {
    label: 'claude-1.3-100k',
    value: 'claude-1.3-100k'
  },
  {
    label: 'claude-1.2',
    value: 'claude-1.2'
  },
  {
    label: 'claude-1.0',
    value: 'claude-1.0'
  },
  {
    label: 'claude-instant-1.1',
    value: 'claude-instant-1.1'
  },
  {
    label: 'claude-instant-1.1-100k',
    value: 'claude-instant-1.1-100k'
  },
  {
    label: 'claude-instant-1.0',
    value: 'claude-instant-1.0'
  }
];
