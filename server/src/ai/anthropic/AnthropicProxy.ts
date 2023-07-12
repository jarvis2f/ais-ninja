import Anthropic from "@anthropic-ai/sdk";
import {APIResponse} from "@anthropic-ai/sdk/dist/cjs/core";
import {Stream} from "@anthropic-ai/sdk/streaming";
import {RequestOptions} from "@anthropic-ai/sdk/dist/cjs/core";
import CompletionCreateParams = Anthropic.CompletionCreateParams;
import Completion = Anthropic.Completion;
import ApiProxy from "../ApiProxy";

export class AnthropicProxy extends ApiProxy<Anthropic> {

  async createCompletions(body: CompletionCreateParams.CompletionRequestNonStreaming, options?: RequestOptions): Promise<APIResponse<Completion>>;

  async createCompletions(body: CompletionCreateParams.CompletionRequestStreaming, options?: RequestOptions): Promise<APIResponse<Stream<Completion>>>;

  async createCompletions(body: CompletionCreateParams, options?: RequestOptions): Promise<APIResponse<Completion | Stream<Completion>>> {
    const response = await this.apiClient.completions.create(body as any, options);
    return response;
  }

}
