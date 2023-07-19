import ApiProxy from "./ApiProxy";
import {ApiClient, Caller} from "./types";
import {Token} from "../models/Token";
import {getLogger} from "../utils/logger";

const logger = getLogger("ai");

export abstract class SupplierClient<T extends ApiClient> {
  public supplier: string;
  protected clients = new Map<number, [Token, T]>();

  protected constructor(supplier: string) {
    this.supplier = supplier;
  }

  abstract buildClient(token: Token): T ;

  abstract buildProxy(client: [Token, T], caller: Caller): [Token, ApiProxy<T>];

  async initClients() {
    let tokens = await Token.findAll({
      where: {
        status: 1,
        supplier: this.supplier
      },
      raw: true
    });
    if (tokens.length === 0) {
      logger.warn(`No ${this.supplier} tokens provided`);
      return;
    }
    tokens.forEach((token) => {
      this.putClient(token);
    });
  }

  putClient(token: Token) {
    this.clients.set(token.id, [token, this.buildClient(token)]);
  }

  removeClient(tokenId: number) {
    this.clients.delete(tokenId);
  }

  getClient(tokenId: number): [Token, T] {
    if (!this.clients.has(tokenId)) {
      throw new Error(`No ${this.supplier} client found for token ${tokenId}`);
    }
    return this.clients.get(tokenId)!;
  }

  getRandomClient(model: string, caller: Caller): [Token, ApiProxy<T>] {
    const clients = Array.from(this.clients.values());
    const noModel = model === this.supplier;
    const client = clients.filter((value: [Token, T]) => {
      const [token, _] = value;
      return token.models?.split(",").includes(model) || noModel;
    }).at(Math.floor(Math.random() * clients.length));
    if (!client) {
      throw new Error(`No ${this.supplier} client found for model ${model}`);
    }
    return this.buildProxy(client, caller);
  }
}
