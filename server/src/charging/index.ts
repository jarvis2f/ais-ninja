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

const logger = getLogger("charging");

interface ModelRatio {
  [key: string]: {
    input: number;
    output: number;
  } | number | {
    [key: string]: number
  };
}

interface UserLevelRatio {
  [key: string]: number
}

interface Caller {
  user_id?: number;
  api_key_id?: number;
}

async function calculateUsage(model: string, level: UserLevelEnum, tokens: number | [number, number]): Promise<number> {
  return calculateUsageGroup(model, level, tokens).then((usage) => {
    return usage[0] + usage[1];
  });
}

async function calculateUsageGroup(model: string, level: UserLevelEnum,
                                   tokens: number | [number, number],
                                   modelRatioKey: string = ''): Promise<[number, number]> {
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
      if (!modelRatioKey) {
        logger.error(`Model ${model} ratio item is invalid: ${modelRatioItem}, charge failed`);
        return [0, 0];
      }
      input = 1;
      output = (modelRatioItem as any)[modelRatioKey];
    } else if (modelRatioItem.input && modelRatioItem.output) {
      input = modelRatioItem.input;
      output = modelRatioItem.output;
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
    api_key_id: api_key_id!,
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
    api_key_id: api_key_id!,
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
  const [_, output_integral] = await calculateUsageGroup(model, user!.level, n || 1, size);

  await UserApiKeyUsage.create({
    user_id: user_id!,
    api_key_id: api_key_id!,
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
    api_key_id: api_key_id!,
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

export default {
  calculateUsage,
  completions,
  chat_completions,
  image_generations,
  embeddings,
};
