import Anthropic from "@anthropic-ai/sdk";
import {APIResponse, RequestOptions} from "@anthropic-ai/sdk/dist/cjs/core";
import {Stream} from "@anthropic-ai/sdk/streaming";
import ApiProxy from "../ApiProxy";
import charging from "../../charging";
import CompletionCreateParams = Anthropic.CompletionCreateParams;
import Completion = Anthropic.Completion;
import {MixModel} from "../types";

const models = [
  {
    name: 'CLAUDE-1',
    model: 'claude-1',
  },
  {
    name: 'CLAUDE-1-100k',
    model: 'claude-1-100k',
  },
  {
    name: 'CLAUDE-1.3',
    model: 'claude-1.3',
  },
  {
    name: 'CLAUDE-1.3-100k',
    model: 'claude-1.3-100k',
  },
  {
    name: 'CLAUDE-INSTANT-1.1',
    model: 'claude-instant-1.1',
  },
];

export class AnthropicProxy extends ApiProxy<Anthropic> {

  listModels(mix?: boolean): Promise<MixModel[]> {
    return Promise.resolve(models.map(model => {
      return {
        ...model,
        type: 'image',
        supplier: 'anthropic'
      }
    }));
  }

  async createCompletions(body: CompletionCreateParams.CompletionRequestNonStreaming, options?: RequestOptions): Promise<APIResponse<Completion>>;

  async createCompletions(body: CompletionCreateParams.CompletionRequestStreaming, options?: RequestOptions): Promise<APIResponse<Stream<Completion>>>;

  async createCompletions(body: CompletionCreateParams, options?: RequestOptions): Promise<APIResponse<Completion | Stream<Completion>>> {
    const response = await this.apiClient.completions.create(body as any, options)
    if (body.stream) {
      // @ts-ignore
      const data = (response as APIResponse<Stream<Completion>>).response.body;
      let responseData = '';
      data.on('data', (chunk) => {
        responseData += chunk;
      });

      data.on('end', () => {
        charging.anthropic_completions(this.caller, {request: body, response: responseData});
      });
    } else {
      const data = (response as APIResponse<Completion>);
      charging.anthropic_completions(this.caller, {request: body, response: data});
    }
    return response;
  }

}
