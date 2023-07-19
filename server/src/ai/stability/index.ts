import {SupplierClient} from "../SupplierClient";
import {Token} from "../../models/Token";
import {StabilityProxy} from "./StabilityProxy";
import {Caller} from "../types";
import ApiProxy from "../ApiProxy";
import {StabilityRestAPI} from "./StabilityRestAPI";

export class StabilityClient extends SupplierClient<StabilityRestAPI> {

  public static SUPPLIER: string = 'stability';

  constructor() {
    super(StabilityClient.SUPPLIER);
  }

  buildClient(token: Token): StabilityRestAPI {
    return new StabilityRestAPI(token.key, {
      baseURL: token.host || 'https://api.stability.ai'
    });
  }

  buildProxy(client: [Token, StabilityRestAPI], caller: Caller): [Token, ApiProxy<StabilityRestAPI>] {
    return [client[0], new StabilityProxy(client[1] as StabilityRestAPI, caller.user_id!, caller.api_key_id)];
  }

}
