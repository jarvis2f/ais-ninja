import globalAxios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {
  Engine,
  ImageResponse,
  ImageToImageMaskingParams,
  ImageToImageParams,
  ImageToImageUpscaleParams,
  TextToImageParams, UserAccount, UserBalance
} from "./types";

export class StabilityRestAPI {

  private readonly apiKey: string;
  private readonly globalConfig: AxiosRequestConfig = {
    baseURL: 'https://api.stability.ai',
    headers: {
      'accept': 'application/json',
    }
  };

  constructor(apiKey: string, config: AxiosRequestConfig) {
    this.apiKey = apiKey;
    this.globalConfig = {
      ...this.globalConfig,
      ...config,
    };
  }

  protected async getAxiosInstance() {
    const axios = globalAxios.create(this.globalConfig);
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.apiKey}`;
    return axios;
  }

  public async listEngines(): Promise<AxiosResponse<Engine[]>> {
    const axios = await this.getAxiosInstance();
    return axios.get('/v1/engines/list');
  }

  public async getUserAccount(): Promise<AxiosResponse<UserAccount>> {
    const axios = await this.getAxiosInstance();
    return axios.get('/v1/user/account');
  }

  public async getUserBalance(): Promise<AxiosResponse<UserBalance>> {
    const axios = await this.getAxiosInstance();
    return axios.get('/v1/user/balance');
  }

  public async textToImage(engine_id: string, params: TextToImageParams): Promise<AxiosResponse<ImageResponse>> {
    const axios = await this.getAxiosInstance();
    return axios.post(`/v1/generation/${engine_id}/text-to-image`, params);
  }

  public async imageToImage(engine_id: string, params: ImageToImageParams): Promise<AxiosResponse<ImageResponse>> {
    const axios = await this.getAxiosInstance();
    return axios.post(`/v1/generation/${engine_id}/image-to-image`, params);
  }

  public async imageToImageUpscale(engine_id: string, params: ImageToImageUpscaleParams): Promise<AxiosResponse<ImageResponse>> {
    const axios = await this.getAxiosInstance();
    return axios.post(`/v1/generation/${engine_id}/image-to-image/upscale`, params);
  }

  public async imageToImageMasking(engine_id: string, params: ImageToImageMaskingParams): Promise<AxiosResponse<ImageResponse>> {
    const axios = await this.getAxiosInstance();
    return axios.post(`/v1/generation/${engine_id}/image-to-image/masking`, params);
  }
}


