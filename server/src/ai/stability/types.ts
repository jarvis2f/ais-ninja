export interface ErrorObject {
  id: string
  message: string
  name: string
}

export interface Engine {
  id: string
  name: string
  description: string
  type: string
}

export enum DiffusionSamplerMap {
  DDIM,
  DDPM,
  K_EULER,
  K_EULER_ANCESTRAL,
  K_HEUN,
  K_DPM_2,
  K_DPM_2_ANCESTRAL,
  K_LMS,
  K_DPMPP_2S_ANCESTRAL,
  K_DPMPP_2M,
  K_DPMPP_SDE,
}

export enum GuidancePresetMap {
  NONE,
  SIMPLE,
  FAST_BLUE,
  FAST_GREEN,
  SLOW,
  SLOWER,
  SLOWEST,
}

export enum StylePresetMap {
  '3d-model',
  'analog-film',
  'anime',
  'cinematic',
  'comic-book',
  'digital-art',
  'enhance',
  'fantasy-art',
  'isometric',
  'line-art',
  'low-poly',
  'modeling-compound',
  'neon-punk',
  'origami',
  'photographic',
  'pixel-art',
  'tile-texture'
}

export type GenerationTextPrompt = {
  /** The text prompt, maximum of 2000 characters. */
  text: string;
  /** The weight of the prompt, use negative values for negative prompts. */
  weight?: number;
};

export type CommonGenerationParams = {
  text_prompts: GenerationTextPrompt[];
  cfg_scale?: number;
  clip_guidance_preset?: GuidancePresetMap[keyof GuidancePresetMap];
  sampler: DiffusionSamplerMap[keyof DiffusionSamplerMap];
  samples?: number;
  seed?: number;
  steps?: number;
  style_preset?: StylePresetMap[keyof StylePresetMap];
  extras?: {};
};

export type TextToImageParams = CommonGenerationParams & {
  height?: number;
  width?: number;
};

export type ImageToImageParams = CommonGenerationParams & {
  init_image: Buffer;
  init_image_mode: "IMAGE_STRENGTH" | "STEP_SCHEDULE";
  image_strength?: number;
  step_schedule_start?: number;
  step_schedule_end?: number;
};

export type ImageToImageUpscaleParams =  {
  image: Buffer;
  width: number;
  height: number;
  seed?: number;
  steps?: number;
  cfg_scale?: number;
  text_prompts?: GenerationTextPrompt[];
}

export type ImageToImageMaskingParams = CommonGenerationParams & {
  init_image: Buffer;
  mask_source: "MASK_IMAGE_WHITE" | "MASK_IMAGE_BLACK" | "INIT_IMAGE_ALPHA";
  mask_image: Buffer;
};

export type ImageResponse = {
  artifacts: Array<{
    base64: string
    seed: number
    finishReason: "CONTENT_FILTERED" | "ERROR" | "SUCCESS"
  }>
}

export type Organization = {
  id: string
  name: string
  role: string
  is_default: boolean
}

export type UserAccount = {
  email: string
  id: string
  organizations: Organization[]
  profile_picture: string
}

export type UserBalance = {
  credits: number
}
