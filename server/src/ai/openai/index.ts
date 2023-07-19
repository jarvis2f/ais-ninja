import {Configuration, OpenAIApi} from "openai";
import {Token} from "../../models/Token";
import {SupplierClient} from "../SupplierClient";
import {Caller} from "../types";
import ApiProxy from "../ApiProxy";
import OpenAIApiProxy from "./OpenAIApiProxy";

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

  buildProxy(client: [Token, OpenAIApi], caller: Caller): [Token, ApiProxy<OpenAIApi>] {
    return [client[0], new OpenAIApiProxy(client[1] as OpenAIApi, caller.user_id!, caller.api_key_id)];
  }

}
