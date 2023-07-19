import {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateEmbeddingRequest,
  CreateEmbeddingResponse,
  CreateImageRequest,
  ImagesResponse,
  ListModelsResponse,
  Model,
  OpenAIApi
} from "openai";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import http from "http";
import charging from "../../charging";
import ApiProxy from "../ApiProxy";
import {MixModel} from "../types";

class OpenAIApiProxy extends ApiProxy<OpenAIApi> {

  async listModels(mix?: boolean): Promise<MixModel[]>;
  async listModels(options?: AxiosRequestConfig): Promise<ListModelsResponse>;
  async listModels(optionsOrMix?: AxiosRequestConfig | boolean, mix?: boolean): Promise<ListModelsResponse | MixModel[]> {
    if (typeof optionsOrMix === 'boolean') {
      mix = optionsOrMix;
      optionsOrMix = undefined;
    }
    return await this.apiClient.listModels(optionsOrMix).then((response) => {
      if (mix) {
        const mappedModels = response.data.data.map((model) => {
          return {
            name: model.id.toUpperCase(),
            model: model.id,
            supplier: 'openai',
            type: 'text' as const,
          }
        });
        return [...mappedModels, {
          name: 'DALL-E',
          model: 'dall-e',
          supplier: 'openai',
          type: 'image' as const,
        }];
      } else {
        return response.data;
      }
    });
  }

  async retrieveModel(model: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Model>> {
    return await this.apiClient.retrieveModel(model, options);
  }

  async createChatCompletion(createChatCompletionRequest: CreateChatCompletionRequest, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<CreateChatCompletionResponse, any>> {
    await this.checkQuota();
    const response = await this.apiClient.createChatCompletion(createChatCompletionRequest, options);
    if (createChatCompletionRequest.stream) {
      // @ts-ignore
      const data = response.data as http.IncomingMessage;
      let responseData = '';
      data.on('data', (chunk) => {
        responseData += chunk;
      });
      data.on('end', () => {
        charging.chat_completions(this.caller,
          {request: createChatCompletionRequest, response: responseData});
      });
    } else {
      charging.chat_completions(this.caller, {request: createChatCompletionRequest, response: response.data});
    }
    return response;
  }

  async createCompletion(createCompletionRequest: CreateCompletionRequest, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<CreateCompletionResponse, any>> {
    await this.checkQuota();
    const response = await this.apiClient.createCompletion(createCompletionRequest, options);
    if (createCompletionRequest.stream) {
      // @ts-ignore
      const data = response.data as http.IncomingMessage;
      let responseData = '';
      data.on('data', (chunk) => {
        responseData += chunk;
      });
      data.on('end', () => {
        charging.completions(this.caller,
          {request: createCompletionRequest, response: responseData});
      });
    } else {
      charging.completions(this.caller, {request: createCompletionRequest, response: response.data});
    }
    return response;
  }

  async createEmbedding(createEmbeddingRequest: CreateEmbeddingRequest, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<CreateEmbeddingResponse, any>> {
    await this.checkQuota();
    const response = await this.apiClient.createEmbedding(createEmbeddingRequest, options);
    charging.embeddings(this.caller, {request: createEmbeddingRequest, response: response.data});
    return response;
  }

  async createImage(createImageRequest: CreateImageRequest, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ImagesResponse, any>> {
    await this.checkQuota();
    const response = await this.apiClient.createImage(createImageRequest, options);
    charging.image_generations(this.caller, 'dall-e', {request: createImageRequest, response: response.data});
    return response;
  }

}

export default OpenAIApiProxy;
