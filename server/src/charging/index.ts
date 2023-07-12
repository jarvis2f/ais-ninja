import {User} from "../models/User";
import {Config, ConfigNameEnum} from "../models/Config";
import {CreateChatCompletionRequest} from "openai/api";
import {
  CreateChatCompletionResponse,
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateImageRequest,
  ImagesResponse
} from "openai";
import {GPTTokens, supportModelType} from "gpt-tokens";
import {getLogger} from "../utils/logger";

const logger = getLogger("charging");

interface Caller {
  user_id?: number;
}

async function calculateUsageGroup(model: string,
                                   tokens: number | [number, number],
                                   modelRatioKey: string = ''): Promise<[number, number]> {
  let usage_input = 0, usage_output = 0;
  if (model.indexOf('dall-e') !== -1) {
    const drawUsePrice = await Config.getConfig(ConfigNameEnum.DRAW_USE_PRICE);
    if (drawUsePrice) {
      const drawUsePriceJson = JSON.parse(drawUsePrice.toString());
      for (const item of drawUsePriceJson) {
        tokens = typeof tokens === 'number' ? tokens : tokens[0];
        if (item.size === modelRatioKey) {
          usage_output = Number(item.integral) * tokens;
        }
      }
    }
  } else {
    const ai3_ratio = (await Config.getConfig(ConfigNameEnum.AI3_RATIO)) || 0;
    const ai4_ratio = (await Config.getConfig(ConfigNameEnum.AI4_RATIO)) || 0;
    let ratio = Number(ai3_ratio);
    if (model.indexOf('gpt-4') !== -1) {
      ratio = Number(ai4_ratio);
    }
    if (typeof tokens === 'number') {
      // not grouped
      usage_output = ratio ? Math.ceil(tokens / ratio) : 0;
    } else {
      // grouped
      usage_input = ratio ? Math.ceil(tokens[0] / ratio) : 0;
      usage_output = ratio ? Math.ceil(tokens[1] / ratio) : 0;
    }
  }
  return [Math.ceil(usage_input), Math.ceil(usage_output)];
}

async function chat_completions(caller: Caller, data: {
  request: CreateChatCompletionRequest,
  response: CreateChatCompletionResponse | string
}) {
  const {user_id} = caller;
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

  const [input_integral, output_integral] = await calculateUsageGroup(request.model as string, [input, output]);
  const integral = input_integral + output_integral;

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
  const {user_id} = caller;
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

  const [input_integral, output_integral] = await calculateUsageGroup(request.model as string, [input, output]);
  const integral = input_integral + output_integral;

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
  const {user_id} = caller;
  let user = await User.findByPk(user_id, {raw: true});
  const {request, response} = data;
  const {size, n} = request;
  const [_, output_integral] = await calculateUsageGroup(model, n || 1, size);

  if (output_integral > 0) {
    await User.updateUserIntegralOrLevelTime({
      user_id: user_id!,
      quantity: -output_integral,
      type: 1,
      describe: `{API调用}(${model})`
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
  completions,
  chat_completions,
  image_generations,
};
