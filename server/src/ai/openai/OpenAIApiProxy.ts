import {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateEmbeddingRequest,
  CreateEmbeddingResponse,
  CreateImageRequest,
  ImagesResponse,
  OpenAIApi
} from "openai";
import {AxiosRequestConfig} from "axios";
import http from "http";
import charging from "../../charging";
import ApiProxy from "../ApiProxy";

class OpenAIApiProxy extends ApiProxy<OpenAIApi> {

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

  async createImage(createImageRequest: CreateImageRequest, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ImagesResponse, any>> {
    await this.checkQuota();
    const response = await this.apiClient.createImage(createImageRequest, options);
    charging.image_generations(this.caller, 'dall-e', {request: createImageRequest, response: response.data});
    return response;
  }

}

export default OpenAIApiProxy;
