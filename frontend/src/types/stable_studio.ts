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
export const DiffusionImageSizeMap = [
	{
		ratio: '7:4',
		width: 896,
		height: 512,
	},
	{
		ratio: '3:2',
		width: 768,
		height: 512,
	},
	{
		ratio: '4:3',
		width: 683,
		height: 512,
	},
	{
		ratio: '5:4',
		width: 640,
		height: 512,
	},
	{
		ratio: '1:1',
		width: 512,
		height: 512,
	},
	{
		ratio: '4:5',
		width: 512,
		height: 640,
	},
	{
		ratio: '3:4',
		width: 512,
		height: 683,
	},
	{
		ratio: '2:3',
		width: 512,
		height: 768,
	},
	{
		ratio: '4:7',
		width: 512,
		height: 896,
	}
]

export type GenerationTextPrompt = {
	/** The text prompt, maximum of 2000 characters. */
	text: string;
	/** The weight of the prompt, use negative values for negative prompts. */
	weight?: number;
};

export type CommonGenerationParams = {
	text_prompts: GenerationTextPrompt[];
	cfg_scale?: number;
	clip_guidance_preset?: string;
	sampler?: string;
	samples: number;
	seed?: number;
	steps?: number;
	style_preset?: string;
	extras?: {};
};

export type TextToImageParams = CommonGenerationParams & {
	type: "text-to-image";
	height?: number;
	width?: number;
};

export type ImageToImageParams = CommonGenerationParams & {
	type: "image-to-image";
	init_image: Buffer;
	step_schedule_start: number;
	step_schedule_end?: number;
};

export type ImageToImageMaskingParams = CommonGenerationParams & {
	type: "image-to-image-masking";
	init_image: Buffer;
	mask_image: Buffer;
};

export type GenerationRequestParams =
	| TextToImageParams
	| ImageToImageParams
	| ImageToImageMaskingParams;


export type TextToImageResponse = {
	base64: string;
	finishReason: string;
	seed: number;
}
