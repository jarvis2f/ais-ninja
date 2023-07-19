import ApiProxy from "../ApiProxy";
import {StabilityRestAPI} from "./StabilityRestAPI";
import {MixModel} from "../types";
import {
  ImageResponse,
  ImageToImageMaskingParams,
  ImageToImageParams,
  ImageToImageUpscaleParams,
  TextToImageParams
} from "./types";
import {AxiosResponse} from "axios";
import charging from "../../charging";

export class StabilityProxy extends ApiProxy<StabilityRestAPI> {

  listModels(mix: boolean | undefined): Promise<MixModel[]> {
    return this.listEngines().then((response) => {
      return response.data.map((model) => {
        return {
          name: model.name,
          model: model.id,
        }
      }).map((model) => {
        return {
          ...model,
          supplier: 'stability',
          type: 'image' as const,
        }
      });
    });
  }

  public async textToImage(engine_id: string, params: TextToImageParams): Promise<AxiosResponse<ImageResponse>> {
    let response = await this.apiClient.textToImage(engine_id, params);
    charging.stability_text_to_image(this.caller, {engine_id, request: params, response: response.data});
    return response;
  }

  public async imageToImage(engine_id: string, params: ImageToImageParams): Promise<AxiosResponse<ImageResponse>> {
    return this.apiClient.imageToImage(engine_id, params);
  }

  public async imageToImageUpscale(engine_id: string, params: ImageToImageUpscaleParams): Promise<AxiosResponse<ImageResponse>> {
    return this.apiClient.imageToImageUpscale(engine_id, params);
  }

  public async imageToImagemMasking(engine_id: string, params: ImageToImageMaskingParams): Promise<AxiosResponse<ImageResponse>> {
    return this.apiClient.imageToImageMasking(engine_id, params);
  }

  async listEngines() {
    return this.apiClient.listEngines();
  }

}
