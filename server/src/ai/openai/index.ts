import {Configuration, OpenAIApi} from "openai";
import {Token} from "../../models/Token";
import {SupplierClient} from "../SupplierClient";

export class OpenAIClient extends SupplierClient<OpenAIApi> {

  public static SUPPLIER: string = 'openai';

  constructor() {
    super(OpenAIClient.SUPPLIER);
  }

  buildClient(token: Token): OpenAIApi {
    const configuration = new Configuration({
      apiKey: token.key,
      basePath: `${token.host}/v1`,
    });
    return new OpenAIApi(configuration);
  }

  getAvailableModels(): { label: string; value: string }[] {
    return available_models;
  }

}

const available_models = [
  {
    label: 'gpt-3.5-turbo',
    value: 'gpt-3.5-turbo'
  },
  {
    label: 'gpt-3.5-turbo-16k',
    value: 'gpt-3.5-turbo-16k'
  },
  {
    label: 'gpt-3.5-turbo-0613',
    value: 'gpt-3.5-turbo-0613'
  },
  {
    label: 'gpt-3.5-turbo-16k-0613',
    value: 'gpt-3.5-turbo-16k-0613'
  },
  {
    label: 'gpt-4',
    value: 'gpt-4'
  },
  {
    label: 'gpt-4-0613',
    value: 'gpt-4-0613'
  },
  {
    label: 'gpt-4-32k-0613',
    value: 'gpt-4-32k-0613'
  },
  {
    label: 'gpt-4-32k',
    value: 'gpt-4-32k'
  },
  {
    label: 'text-davinci-003',
    value: 'text-davinci-003'
  },
  {
    label: 'text-davinci-002',
    value: 'text-davinci-002'
  },
  {
    label: 'code-davinci-002',
    value: 'code-davinci-002'
  }
];
