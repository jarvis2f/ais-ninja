import * as Generation from "./generation/generation_pb";
import { GenerationServiceClient } from "./generation/generation_pb_service";
import fs from "fs";
import { ArtifactTypeMap, FinishReasonMap } from "./generation/generation_pb";

export type GenerationTextPrompt = {
  /** The text prompt, maximum of 2000 characters. */
  text: string;
  /** The weight of the prompt, use negative values for negative prompts. */
  weight?: number;
};

export type CommonGenerationParams = {
  prompts: GenerationTextPrompt[];
  samples?: number;
  steps?: number;
  cfgScale?: number;
  sampler?: Generation.DiffusionSamplerMap[keyof Generation.DiffusionSamplerMap];
  clipGuidancePreset?: Generation.GuidancePresetMap[keyof Generation.GuidancePresetMap];
  seed?: number;
};

export type TextToImageParams = CommonGenerationParams & {
  type: "text-to-image";
  height?: number;
  width?: number;
};

export type ImageToImageParams = CommonGenerationParams & {
  type: "image-to-image";
  initImage: Buffer;
  stepScheduleStart: number;
  stepScheduleEnd?: number;
};

export type ImageToImageMaskingParams = CommonGenerationParams & {
  type: "image-to-image-masking";
  initImage: Buffer;
  maskImage: Buffer;
};

export type UpscalingParams = HeightOrWidth & {
  type: "upscaling";
  initImage: Buffer;
  upscaler: Generation.UpscalerMap[keyof Generation.UpscalerMap];
};

type HeightOrWidth =
  | { height: number; width?: never }
  | { height?: never; width: number }
  | { height?: never; width?: never };

export type GenerationRequestParams =
  | TextToImageParams
  | ImageToImageParams
  | ImageToImageMaskingParams
  | UpscalingParams;

export type GenerationRequest = Generation.Request;
export type GenerationResponse = GenerationArtifacts | Error;
export type GenerationArtifacts = {
  /**
   * Successfully generated artifacts whose binary content is available.
   */
  imageArtifacts: Array<ImageArtifact>;

  /**
   * These artifacts were filtered due to the NSFW classifier.  This classifier is imperfect and
   * has frequent false-positives. You are not charged for blurred images and are welcome to retry.
   */
  filteredArtifacts: Array<NSFWFilteredArtifact>;
};

export type ImageArtifact = Omit<
  Generation.Artifact,
  "hasBinary" | "getType" | "getFinishReason"
> & {
  getType(): FinishReasonMap["NULL"];
  getFinishReason(): ArtifactTypeMap["ARTIFACT_IMAGE"];
  hasBinary(): true;
};

export const isImageArtifact = (
  artifact: Generation.Artifact
): artifact is ImageArtifact =>
  artifact.getType() === Generation.ArtifactType.ARTIFACT_IMAGE &&
  artifact.getFinishReason() === Generation.FinishReason.NULL &&
  artifact.hasBinary();

/** This represents an artifact whose content was blurred by the NSFW classifier. */
export type NSFWFilteredArtifact = Omit<
  Generation.Artifact,
  "getType" | "getFinishReason"
> & {
  getType(): FinishReasonMap["FILTER"];
  getFinishReason(): ArtifactTypeMap["ARTIFACT_IMAGE"];
};

export const isNSFWFilteredArtifact = (
  artifact: Generation.Artifact
): artifact is NSFWFilteredArtifact =>
  artifact.getType() === Generation.ArtifactType.ARTIFACT_IMAGE &&
  artifact.getFinishReason() === Generation.FinishReason.FILTER;

/** Builds a generation request for a specified engine with the specified parameters. */
export function buildGenerationRequest(
  engineID: string,
  params: GenerationRequestParams
): GenerationRequest {
  if (params.type === "upscaling") {
    const request = new Generation.Request();
    request.setEngineId(engineID);
    request.setRequestedType(Generation.ArtifactType.ARTIFACT_IMAGE);
    request.setClassifier(new Generation.ClassifierParameters());

    const imageParams = new Generation.ImageParameters();
    if ("width" in params && !!params.width) {
      imageParams.setWidth(params.width);
    } else if ("height" in params && !!params.height) {
      imageParams.setHeight(params.height);
    }
    request.setImage(imageParams);
    request.addPrompt(createInitImagePrompt(params.initImage));

    return request;
  }

  const imageParams = new Generation.ImageParameters();
  if (params.type === "text-to-image") {
    params.width && imageParams.setWidth(params.width);
    params.height && imageParams.setHeight(params.height);
  }

  // Set the number of images to generate (Default 1)
  params.samples && imageParams.setSamples(params.samples);

  // Set the steps (Default 30)
  // Represents the amount of inference steps performed on image generation.
  params.steps && imageParams.setSteps(params.steps);

  // Set the seed (Default 0)
  // Including a seed will cause the results to be deterministic.
  // Omitting the seed or setting it to `0` will do the opposite.
  params.seed && imageParams.addSeed(params.seed);

  // Set the sampler (Default 'automatic')
  // Omitting this value enables 'automatic' mode where we choose the best sampler for you based
  // on the current payload. For example, since CLIP guidance only works on ancestral samplers,
  // when CLIP guidance is enabled, we will automatically choose an ancestral sampler for you.
  if (params.sampler) {
    const transformType = new Generation.TransformType();
    transformType.setDiffusion(params.sampler);
    imageParams.setTransform(transformType);
  }

  // Set the Engine
  // At the time of writing, valid engines are:
  //  stable-diffusion-v1,
  //  stable-diffusion-v1-5
  //  stable-diffusion-512-v2-0
  //  stable-diffusion-768-v2-0
  //  stable-diffusion-512-v2-1
  //  stable-diffusion-768-v2-1
  //  stable-inpainting-v1-0
  //  stable-inpainting-512-v2-0
  //  stable-diffusion-xl-beta-v2-2-2
  //  stable-diffusion-xl-1024-v0-9
  //  esrgan-v1-x2plus
  const request = new Generation.Request();
  request.setEngineId(engineID);
  request.setRequestedType(Generation.ArtifactType.ARTIFACT_IMAGE);
  request.setClassifier(new Generation.ClassifierParameters());

  // Set the CFG scale (Default 7)
  // Influences how strongly your generation is guided to match your prompt.  Higher values match closer.
  const samplerParams = new Generation.SamplerParameters();
  params.cfgScale && samplerParams.setCfgScale(params.cfgScale);

  const stepParams = new Generation.StepParameter();
  stepParams.setScaledStep(0);
  stepParams.setSampler(samplerParams);

  const scheduleParams = new Generation.ScheduleParameters();
  if (params.type === "image-to-image") {
    // If we're doing image-to-image generation then we need to configure
    // how much influence the initial image has on the diffusion process
    scheduleParams.setStart(params.stepScheduleStart);
    if (params.stepScheduleEnd) {
      scheduleParams.setEnd(params.stepScheduleEnd);
    }
  } else if (params.type === "image-to-image-masking") {
    // Step schedule start is always 1 for masking requests
    scheduleParams.setStart(1);
  }

  stepParams.setSchedule(scheduleParams);

  // Set CLIP Guidance (Default: None)
  // NOTE: This only works with ancestral samplers. Omitting the sampler parameter above will ensure
  // that we automatically choose an ancestral sampler for you when CLIP guidance is enabled.
  if (params.clipGuidancePreset) {
    const guidanceParameters = new Generation.GuidanceParameters();
    guidanceParameters.setGuidancePreset(params.clipGuidancePreset);
    stepParams.setGuidance(guidanceParameters);
  }

  imageParams.addParameters(stepParams);
  request.setImage(imageParams);

  params.prompts.forEach((textPrompt) => {
    const prompt = new Generation.Prompt();
    prompt.setText(textPrompt.text);

    // If provided, set the prompt's weight (use negative values for negative weighting)
    if (textPrompt.weight) {
      const promptParameters = new Generation.PromptParameters();
      promptParameters.setWeight(textPrompt.weight);
      prompt.setParameters(promptParameters);
    }

    request.addPrompt(prompt);
  });

  // Add image prompts if we're doing some kind of image-to-image generation or upscaling
  if (params.type === "image-to-image") {
    request.addPrompt(createInitImagePrompt(params.initImage));
  } else if (params.type === "image-to-image-masking") {
    request.addPrompt(createInitImagePrompt(params.initImage));
    request.addPrompt(createMaskImagePrompt(params.maskImage));
  }

  return request;
}

function createInitImagePrompt(imageBinary: Buffer): Generation.Prompt {
  const initImageArtifact = new Generation.Artifact();
  initImageArtifact.setBinary(imageBinary);
  initImageArtifact.setType(Generation.ArtifactType.ARTIFACT_IMAGE);

  const initImageParameters = new Generation.PromptParameters();
  initImageParameters.setInit(true);

  const initImagePrompt = new Generation.Prompt();
  initImagePrompt.setParameters(initImageParameters);
  initImagePrompt.setArtifact(initImageArtifact);

  return initImagePrompt;
}

function createMaskImagePrompt(imageBinary: Buffer): Generation.Prompt {
  const maskImageArtifact = new Generation.Artifact();
  maskImageArtifact.setBinary(imageBinary);
  maskImageArtifact.setType(Generation.ArtifactType.ARTIFACT_MASK);

  const maskImagePrompt = new Generation.Prompt();
  maskImagePrompt.setArtifact(maskImageArtifact);

  return maskImagePrompt;
}

/** Executes a GenerationRequest, abstracting the gRPC streaming result behind a Promise */
export async function executeGenerationRequest(
  generationClient: GenerationServiceClient,
  request: GenerationRequest,
): Promise<GenerationResponse> {
  try {
    const stream = generationClient.generate(request);
    const answers = await new Promise<Generation.Answer[]>(
      (resolve, reject) => {
        const answers = new Array<Generation.Answer>();

        stream.on("data", (data) => answers.push(data));
        stream.on("end", () => resolve(answers));
        stream.on("status", (status) => {
          if (status.code === 0) return;
          reject(status.details);
        });
      }
    );

    return extractArtifacts(answers);
  } catch (err) {
    return err instanceof Error ? err : new Error(JSON.stringify(err));
  }
}

function extractArtifacts(answers: Generation.Answer[]): GenerationArtifacts {
  const imageArtifacts = new Array<ImageArtifact>();
  const filteredArtifacts = new Array<NSFWFilteredArtifact>();

  for (const answer of answers) {
    for (const artifact of answer.getArtifactsList()) {
      if (isImageArtifact(artifact)) {
        imageArtifacts.push(artifact);
      } else if (isNSFWFilteredArtifact(artifact)) {
        filteredArtifacts.push(artifact);
      }
    }
  }

  return { filteredArtifacts, imageArtifacts };
}

/** Generation completion handler - replace this with your own logic  */
export function onGenerationComplete(response: GenerationResponse) {
  if (response instanceof Error) {
    console.error("Generation failed", response);
    throw response;
  }

  console.log(
    `${response.imageArtifacts.length} image${
      response.imageArtifacts.length > 1 ? "s" : ""
    } were successfully generated.`
  );

  // Do something with NSFW filtered artifacts
  if (response.filteredArtifacts.length > 0) {
    console.log(
      `${response.filteredArtifacts.length} artifact` +
      `${response.filteredArtifacts.length > 1 ? "s" : ""}` +
      ` were filtered by the NSFW classifier and need to be retried.`
    );
  }

  // Do something with the successful image artifacts
  response.imageArtifacts.forEach((artifact: Generation.Artifact) => {
    try {
      fs.writeFileSync(
        `image-${artifact.getSeed()}.png`,
        Buffer.from(artifact.getBinary_asU8())
      );
    } catch (error) {
      console.error("Failed to write resulting image to disk", error);
    }
  });

  // For browser implementations: you could use the `artifact.getBinary_asB64()` method to get a
  // base64 encoded string and then create a data URL from that and display it in an <img> tag.
}
