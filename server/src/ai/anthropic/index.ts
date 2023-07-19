import {Token} from "../../models/Token";
import Anthropic from "@anthropic-ai/sdk";
import {SupplierClient} from "../SupplierClient";
import {Caller} from "../types";
import ApiProxy from "../ApiProxy";
import {AnthropicProxy} from "./AnthropicProxy";

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

  buildProxy(client: [Token, Anthropic], caller: Caller): [Token, ApiProxy<Anthropic>] {
    return [client[0], new AnthropicProxy(client[1] as Anthropic, caller.user_id!, caller.api_key_id)];
  }

}
