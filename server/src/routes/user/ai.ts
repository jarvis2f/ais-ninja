import {Router} from "express";
import ApiResponse from "../../utils/response";
import {User, UserLevelEnum} from "../../models/User";
import {Config, ConfigNameEnum} from "../../models/Config";
import {Message} from "../../models/Message";
import {OpenAIApi} from "openai";
import {OpenAIChat} from "../../ai/openai/OpenAIChat";
import {Plugin} from "../../models/Plugin";
import {Functions} from "../../models/Functions";
import utils from "../../utils";
import {Action, ActionTypeEnum} from "../../models/Action";
import {RedemptionCodeTypeEnum} from "../../models/RedemptionCode";
import {Turnover} from "../../models/Turnover";
import {getLogger} from "../../utils/logger";
import {CreateImageRequestSizeEnum} from "openai/api";
import {AnthropicChat} from "../../ai/anthropic/Chat";
import {supplierClientAgent} from "../../ai";
import {Message as AiMessage} from "../../ai/types";
import charging from "../../charging";
import OpenAIApiProxy from "../../ai/openai/OpenAIApiProxy";


const router = Router();
const logger = getLogger('routes:user:openai');

router.post('/chat/completions', async (req, res) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {prompt, parentMessageId, debug} = req.body;
  const options = {
    ...req.body.options,
    stream: true,
  };
  let user = await User.findByPk(user_id, {
    include: [{
      model: Plugin,
      as: 'installed_plugins',
      through: {},
      include: [{
        model: Functions,
        as: 'functions'
      }]
    }]
  }).then(user => user?.toJSON()) as User;
  const level_expire_time = new Date(user?.level_expire_time);
  let level = user?.level || UserLevelEnum.NORMAL;
  if (level_expire_time < new Date()) {
    level = UserLevelEnum.NORMAL;
  }
  if (options.model.includes('gpt-4') && level === UserLevelEnum.NORMAL) {
    res.json(ApiResponse.error(500, req.t('GPT4为会员使用')));
    return;
  }

  const history_message_count = await Config.getConfig(ConfigNameEnum.HISTORY_MESSAGE_COUNT);
  const history_messages = await Message.findAll({
    where: {
      user_id,
      parent_message_id: parentMessageId,
    },
    limit: history_message_count ? Number(history_message_count) : 100,
    order: [['id', 'DESC']],
    raw: true,
  }).then((messages) => {
    return messages.map((message: Message) => {
      return {
        name: message.name === '' ? undefined : message.name,
        role: message.role as any,
        content: message.content || '',
        is_history: true,
      }
    }).reverse();
  });

  const SAVE_MESSAGE_HANDLER = async (message: AiMessage[], model: string, usedTokens: number | [number, number]) => {
    await Message.bulkCreate([
      ...message.filter((item) => !item.is_history).map((item) => {
        item.is_history = true;
        return {
          user_id,
          name: item.name,
          role: item.role,
          content: item.content,
          parent_message_id: parentMessageId,
          ...options
        } as Message
      }),
    ])
  }

  // const DEDUCT_INTEGRAL_HANDLER = async (message: AiMessage[], model: string, usedTokens: number | [number, number]) => {
  //   let integral = await charging.calculateUsage(model, user.level, usedTokens);
  //   if (integral > 0) {
  //     await User.updateUserVIP({
  //       user_id: user_id,
  //       type: RedemptionCodeTypeEnum.INTEGRAL,
  //       value: integral,
  //       operate: 'decrement'
  //     });
  //     await Turnover.add(user_id, `{对话}(${options.model})`, `-${integral}{积分}`);
  //   }
  // }

  if (options.model.startsWith('claude')) {
    await new AnthropicChat(res, options, parentMessageId, history_messages)
      .set_user_id(user_id)
      .add_finish_handler(SAVE_MESSAGE_HANDLER)
      // .add_finish_handler(DEDUCT_INTEGRAL_HANDLER)
      .chat({
        role: 'user',
        content: prompt
      })
  } else {
    await new OpenAIChat(res, options, parentMessageId, history_messages)
      .init_functions(user.installed_plugins || [])
      .set_user_id(user_id)
      .setDebug(debug)
      .add_finish_handler(SAVE_MESSAGE_HANDLER)
      // .add_finish_handler(DEDUCT_INTEGRAL_HANDLER)
      .chat({
        role: 'user',
        content: prompt
      });
  }

  await Action.add(user_id, ActionTypeEnum.CHAT, utils.getClientIP(req), `对话(${options.model})`);
});

router.post('/images/generations', async (req, res) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {prompt, n = 1, width = 256, height = 256, response_format = 'url'} = req.body;
  const size = `${width}x${height}` as CreateImageRequestSizeEnum;
  const user = await User.findByPk(user_id).then(user => user?.toJSON()) as User;
  if (!user) {
    res.json(ApiResponse.miss());
    return;
  }
  const ip = utils.getClientIP(req);
  let deductIntegral = 0;
  const drawUsePrice = await Config.getConfig(ConfigNameEnum.DRAW_USE_PRICE);
  if (drawUsePrice) {
    const drawUsePriceJson = JSON.parse(drawUsePrice.toString());
    for (const item of drawUsePriceJson) {
      if (item.size === size) {
        deductIntegral = Number(item.integral);
      }
    }
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();
  const vipExpireTime = new Date(user.vip_expire_time).getTime();
  if (!(user.integral! > deductIntegral || vipExpireTime >= todayTime)) {
    res.json(ApiResponse.error(500, req.t('余额不足')));
    return;
  }
  const openai = supplierClientAgent.getRandomClient('dall-e', {user_id})[1] as OpenAIApiProxy;
  const response = await openai.createImage({
    prompt,
    n,
    size,
    response_format
  }).catch((e) => {
    logger.error(e);
    return null;
  });
  if (!response) {
    res.json(ApiResponse.error(500, req.t('生成失败')));
    return;
  }
  // if (vipExpireTime < todayTime) {
  //   await User.updateUserVIP({
  //     user_id: user_id,
  //     type: RedemptionCodeTypeEnum.INTEGRAL,
  //     value: deductIntegral,
  //     operate: 'decrement'
  //   });
  //   await Turnover.add(user_id, `{绘画} ${size}`, `-${deductIntegral}{积分}`);
  // }
  Action.add(user_id, ActionTypeEnum.DRAW, ip, `绘画(${size})`);
  res.json(ApiResponse.success(response.data?.data));
})

export default router;
