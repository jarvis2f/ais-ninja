import {User} from "../models/User";
import {ApiClient, Caller} from "./types";

export default abstract class ApiProxy<T extends ApiClient> {

  protected readonly apiClient: T;
  protected readonly caller: Caller;

  constructor(apiClient: T, user_id: number, api_key_id?: number) {
    this.apiClient = apiClient;
    this.caller = {user_id, api_key_id};
  }

  protected async checkQuota(): Promise<void> {
    await User.findByPk(this.caller.user_id, {raw: true}).then((user) => {
      if (user && user.integral > 0) {
        return;
      }
      throw new Error(`User ${this.caller.user_id} has no quota`);
    });
  }

}
