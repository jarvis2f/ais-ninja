import {User, UserLevelEnum} from "../models/User";
import {Config, ConfigNameEnum} from "../models/Config";
import {CreateChatCompletionRequest, CreateCompletionRequest} from "openai/api";
import {
  CreateChatCompletionResponse,
  CreateCompletionResponse,
  CreateEmbeddingRequest,
  CreateEmbeddingResponse,
  CreateImageRequest,
  ImagesResponse
} from "openai";
import {GPTTokens, supportModelType} from "gpt-tokens";
import {getLogger} from "../utils/logger";
import {UserApiKeyUsage} from "../models/UserApiKeyUsage";
import Anthropic from "@anthropic-ai/sdk";
import {APIResponse} from "@anthropic-ai/sdk/dist/cjs/core";
import {ImageResponse, ImageToImageParams, TextToImageParams} from "../ai/stability/types";
import CompletionCreateParams = Anthropic.CompletionCreateParams;
import Completion = Anthropic.Completion;

const logger = getLogger("charging");

/**
 * {
 *   "模型名称": {
 *     "input": "提示倍率",
 *     "output": "完成倍率"
 *   },
 *   "模型名称2": "单倍率，如：嵌入模型(text-embedding-ada-002)",
 *   "dall-e": {
 *     "256*256": "openAI图形生成倍率 按照size设置"
 *   },
 *   "!SDXL": {
 *     "512*512": {
 *        "15": "非 SDXL 模型的 512*512 steps为15的倍率"
 *     }
 *   },
 *   "stable-diffusion-xl-1024-v0-9": {
 *     "15": "此模型只跟steps有关"
 *   },
 *   "stable-diffusion-xl-beta-v2-2-2": {
 *      "512*512": {
 *        "15": "非 SDXL 模型的 512*512 steps为15的倍率"
 *      }
 *   }
 * }
 */
interface ModelRatio {
  [key: string]: {
    input: number;
    output: number;
  } | number | {
    [key: string]: number
  } | {
    [key: string]: {
      [key: string]: number
    }
  };
}

interface UserLevelRatio {
  [key: string]: number
}

interface Caller {
  user_id?: number;
  api_key_id?: number;
}

async function calculateUsage(model: string, level: UserLevelEnum, tokens: number, ...modelRatioKeys: string[]): Promise<number> {
  return calculateUsageGroup(model, level, tokens, ...modelRatioKeys).then((usage) => {
    return usage[0] + usage[1];
  });
}

async function calculateUsageGroup(model: string, level: UserLevelEnum,
                                   tokens: number | [number, number],
                                   ...modelRatioKeys: string[]): Promise<[number, number]> {
  const modelRatioItem = await Config.getConfig(ConfigNameEnum.MODEL_RATIO).then((config) => {
    let modelRatio: ModelRatio = JSON.parse(config);
    return modelRatio[model];
  });
  const userLevelRatioItem = await Config.getConfig(ConfigNameEnum.USER_LEVEL_RATIO).then((config) => {
    let userLevelRatio: UserLevelRatio = JSON.parse(config);
    return userLevelRatio[UserLevelEnum[level]] || 0;
  });

  let input, output;
  if (!modelRatioItem) {
    input = 0;
    output = 0;
  } else if (typeof modelRatioItem === 'number') {
    input = modelRatioItem;
    output = modelRatioItem;
  } else {
    if (!modelRatioItem.input && !modelRatioItem.output) {
      if (!modelRatioKeys || modelRatioKeys.length === 0) {
        logger.error(`Model ${model} ratio item is invalid: ${modelRatioItem}, lack modelRatioKeys, charge failed`);
        return [0, 0];
      }
      input = 1;
      // 递归获取ratio
      const getRatio = (ratioConfig: any): number | object => {
        if (typeof ratioConfig === 'number') {
          return ratioConfig;
        } else if (typeof ratioConfig === 'object') {
          const key = modelRatioKeys.shift();
          if (!key) {
            logger.error(`Model ${model} ratio item is invalid: ${modelRatioItem}, charge failed`);
            return 0;
          }
          return getRatio(ratioConfig[key]);
        } else {
          logger.error(`Model ${model} ratio item is invalid: ${modelRatioItem}, charge failed`);
          return 0;
        }
      }
      const ratio = getRatio(modelRatioItem);
      if (typeof ratio !== 'number') {
        return [0, 0];
      }
      output = ratio as number;
    } else if (modelRatioItem.input && modelRatioItem.output) {
      input = modelRatioItem.input as number;
      output = modelRatioItem.output as number;
    } else {
      logger.error(`Model ${model} ratio item is invalid: ${modelRatioItem}, charge failed`);
      return [0, 0];
    }
  }
  let usage_input = 0, usage_output = 0;
  if (typeof tokens === 'number') {
    // not grouped
    usage_output = tokens * output * userLevelRatioItem;
  } else {
    // grouped
    usage_input = tokens[0] * input * userLevelRatioItem;
    usage_output = tokens[1] * output * userLevelRatioItem;
  }
  return [Math.ceil(usage_input), Math.ceil(usage_output)];
}

async function chat_completions(caller: Caller, data: {
  request: CreateChatCompletionRequest,
  response: CreateChatCompletionResponse | string
}) {
  const {user_id, api_key_id} = caller;
  let user = await User.findByPk(user_id, {raw: true});
  const {request, response} = data;
  const {stream} = request;
  let input, output;
  if (stream) {
    let model = request.model as supportModelType;
    if (!model) {
      logger.error(`GPTTokens model is not supported: ${request.model}, charge failed`);
      return;
    }
    input = new GPTTokens({
      model: model,
      messages: request.messages.map((message) => {
        return {
          name: message.name || '',
          content: message.content!,
          role: message.role as any,
        };
      })
    }).usedTokens;
    let output_message = openai_stream_parse(response as string);
    output = 0;
    if (output_message) {
      output = new GPTTokens({
        model: model,
        messages: [output_message] as any,
      }).usedTokens;
    }
  } else {
    const usage = (response as CreateChatCompletionResponse).usage;
    input = usage?.prompt_tokens || 0;
    output = usage?.completion_tokens || 0;
  }

  const [input_integral, output_integral] = await calculateUsageGroup(request.model as string, user!.level, [input, output]);
  const integral = input_integral + output_integral;

  await UserApiKeyUsage.create({
    user_id: user_id!,
    api_key_id: api_key_id,
    model: request.model as string,
    request: JSON.stringify(request),
    response: JSON.stringify(response),
    prompt_tokens: input,
    completion_tokens: output,
    prompt_integral: input_integral,
    completion_integral: output_integral,
  });

  if (integral > 0) {
    await User.updateUserIntegralOrLevelTime({
      user_id: user_id!,
      quantity: -integral,
      type: 1,
      describe: `{API调用}(${request.model})`
    });
  }
}

async function completions(caller: Caller, data: {
  request: CreateCompletionRequest,
  response: CreateCompletionResponse | string
}) {
  const {user_id, api_key_id} = caller;
  let user = await User.findByPk(user_id, {raw: true});
  const {request, response} = data;
  const {stream} = request;
  let input, output;
  if (stream) {
    let model = request.model as supportModelType;
    if (!model) {
      logger.error(`GPTTokens model is not supported: ${request.model}, charge failed`);
      return;
    }
    input = !request.prompt ? 0 : new GPTTokens({
      model: model,
      messages: (Array.isArray(request.prompt) ? request.prompt : [request.prompt]).map((message) => {
        return {
          content: message,
          role: 'user',
        };
      })
    }).usedTokens;
    let output_message = openai_stream_parse(response as string);
    output = 0;
    if (output_message) {
      output = new GPTTokens({
        model: model,
        messages: [output_message] as any,
      }).usedTokens;
    }
  } else {
    const usage = (response as CreateChatCompletionResponse).usage;
    input = usage?.prompt_tokens || 0;
    output = usage?.completion_tokens || 0;
  }

  const [input_integral, output_integral] = await calculateUsageGroup(request.model as string, user!.level, [input, output]);
  const integral = input_integral + output_integral;

  await UserApiKeyUsage.create({
    user_id: user_id!,
    api_key_id: api_key_id,
    model: request.model as string,
    request: JSON.stringify(request),
    response: JSON.stringify(response),
    prompt_tokens: input,
    completion_tokens: output,
    prompt_integral: input_integral,
    completion_integral: output_integral,
  });

  if (integral > 0) {
    await User.updateUserIntegralOrLevelTime({
      user_id: user_id!,
      quantity: -integral,
      type: 1,
      describe: `{API调用}(${request.model})`
    });
  }
}

async function image_generations(caller: Caller, model: string, data: {
  request: CreateImageRequest,
  response: ImagesResponse
}) {
  const {user_id, api_key_id} = caller;
  let user = await User.findByPk(user_id, {raw: true});
  const {request, response} = data;
  const {size, n} = request;
  const output_integral = await calculateUsage(model, user!.level, n || 1, size as string);

  await UserApiKeyUsage.create({
    user_id: user_id!,
    api_key_id: api_key_id,
    model: model,
    request: JSON.stringify(request),
    response: JSON.stringify(response),
    prompt_tokens: 0,
    completion_tokens: 0,
    prompt_integral: 0,
    completion_integral: output_integral,
  });

  if (output_integral > 0) {
    await User.updateUserIntegralOrLevelTime({
      user_id: user_id!,
      quantity: -output_integral,
      type: 1,
      describe: `{API调用}(${model})`
    });
  }
}

async function embeddings(caller: Caller, data: {
  request: CreateEmbeddingRequest,
  response: CreateEmbeddingResponse
}) {
  const {user_id, api_key_id} = caller;
  let user = await User.findByPk(user_id, {raw: true});
  const {request, response} = data;
  const {prompt_tokens} = response.usage;
  const model = request.model;
  const [_, output_integral] = await calculateUsageGroup(model, user!.level, prompt_tokens);

  await UserApiKeyUsage.create({
    user_id: user_id!,
    api_key_id: api_key_id,
    model: model,
    request: JSON.stringify(request),
    response: JSON.stringify(response),
    prompt_tokens: 0,
    completion_tokens: 0,
    prompt_integral: 0,
    completion_integral: output_integral,
  });

  if (output_integral > 0) {
    await User.updateUserIntegralOrLevelTime({
      user_id: user_id!,
      quantity: -output_integral,
      type: 1,
      describe: `{API调用}(${request.model})`
    });
  }
}

function openai_stream_parse(data: string) {
  if (!data || data.length === 0) return;
  const message = {
    name: '',
    content: '',
    role: '',
  }
  for (let line of data.split('data: ')) {
    line = line.trim();
    if (line == '[DONE]' || line.length <= 0) break;
    try {
      const item = JSON.parse(line);
      const choice = (item.choices && item.choices.length > 0) ? item.choices[0] : {};
      choice.delta?.role && (message.role = choice.delta.role);
      choice.delta?.name && (message.name = choice.delta.name);
      choice.delta?.content && (message.content += choice.delta.content);
    } catch (e) {
      logger.error(`openai stream parse error: ${e}, line: ${line}`);
    }
  }
  return message;
}

async function anthropic_completions(caller: Caller, data: {
  request: CompletionCreateParams,
  response: APIResponse<Completion> | string
}) {
  const {user_id, api_key_id} = caller;
  let user = await User.findByPk(user_id, {raw: true});
  const {request, response} = data;
  const {stream} = request;
  let model = 'gpt-4' as supportModelType;
  let output_message;
  if (stream) {
    output_message = anthropic_stream_parse(response as string);
  } else {
    output_message = (response as APIResponse<Completion>).completion;
  }
  let input = new GPTTokens({
    model: model,
    messages: [{
      content: request.prompt,
      role: 'user',
    }]
  }).usedTokens;
  let output = 0;
  if (output_message && output_message.length > 0) {
    output = new GPTTokens({
      model: model,
      messages: [{
        content: output_message,
        role: 'assistant',
      }] as any,
    }).usedTokens;
  }

  const [input_integral, output_integral] = await calculateUsageGroup(request.model as string, user!.level, [input, output]);
  const integral = input_integral + output_integral;

  await UserApiKeyUsage.create({
    user_id: user_id!,
    api_key_id: api_key_id,
    model: request.model as string,
    request: JSON.stringify(request),
    response: JSON.stringify(response),
    prompt_tokens: input,
    completion_tokens: output,
    prompt_integral: input_integral,
    completion_integral: output_integral,
  });

  if (integral > 0) {
    await User.updateUserIntegralOrLevelTime({
      user_id: user_id!,
      quantity: -integral,
      type: 1,
      describe: `{API调用}(${request.model})`
    });
  }
}

function anthropic_stream_parse(data: string) {
  if (!data || data.length === 0) return;
  let content = '';
  for (let line of data.split('event: ')) {
    line = line.trim();
    if (line != 'completion' || line.length <= 0) break;
    line = line.split('data: ')[1];
    if (!line || line.length <= 0) break;
    try {
      const item = JSON.parse(line);
      content += item.completion;
    } catch (e) {
      logger.error(`openai stream parse error: ${e}, line: ${line}`);
    }
  }
  return content;
}

async function stability_text_to_image(caller: Caller, data: {
  engine_id: string,
  request: TextToImageParams,
  response: ImageResponse
}) {
  const {user_id, api_key_id} = caller;
  let user = await User.findByPk(user_id, {raw: true});
  const {request, response, engine_id} = data;
  const modelRatioKeys: string[] = [];
  if (engine_id === 'stable-diffusion-xl-1024-v0-9') {
    modelRatioKeys.push(String(request.steps || 30));
  } else {
    modelRatioKeys.push(`${request.width}*${request.height}`);
    modelRatioKeys.push(String(request.steps || 30));
  }
  const output_integral = await calculateUsage(engine_id, user!.level, request.samples || 1, ...modelRatioKeys);

  await UserApiKeyUsage.create({
    user_id: user_id!,
    api_key_id: api_key_id,
    model: engine_id,
    request: JSON.stringify(request),
    response: JSON.stringify(response),
    prompt_tokens: 0,
    completion_tokens: 0,
    prompt_integral: 0,
    completion_integral: output_integral,
  });

  if (output_integral > 0) {
    await User.updateUserIntegralOrLevelTime({
      user_id: user_id!,
      quantity: -output_integral,
      type: 1,
      describe: `{API调用}(${engine_id})`
    });
  }
}

export default {
  calculateUsage,
  completions,
  chat_completions,
  image_generations,
  embeddings,
  anthropic_completions,
  stability_text_to_image
};
