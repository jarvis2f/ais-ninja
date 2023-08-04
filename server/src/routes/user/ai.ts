import {Router} from "express";
import ApiResponse from "../../utils/response";
import {User, UserLevelEnum} from "../../models/User";
import {Config, ConfigNameEnum} from "../../models/Config";
import {Message} from "../../models/Message";
import {OpenAIChat} from "../../ai/openai/OpenAIChat";
import {Plugin} from "../../models/Plugin";
import {Functions} from "../../models/Functions";
import utils from "../../utils";
import {Action, ActionTypeEnum} from "../../models/Action";
import {getLogger} from "../../utils/logger";
import {CreateImageRequestSizeEnum} from "openai/api";
import {AnthropicChat} from "../../ai/anthropic/Chat";
import {supplierClientAgent} from "../../ai";
import {Message as AiMessage} from "../../ai/types";
import OpenAIApiProxy from "../../ai/openai/OpenAIApiProxy";
import {StabilityProxy} from "../../ai/stability/StabilityProxy";


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
  let level = user?.level;
  if (level_expire_time < new Date()) {
    level = UserLevelEnum.NORMAL;
  }
  if (options.model.includes('gpt-4') && level === UserLevelEnum.NORMAL) {
    res.json(ApiResponse.error(500, req.t('GPT4为会员使用')));
    return;
  }
  if (user.integral <= 0) {
    res.json(ApiResponse.error(500, req.t('积分不足')));
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

  const SAVE_MESSAGE_HANDLER = async (message: AiMessage[], model: string) => {
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

  if (options.model.startsWith('claude')) {
    await new AnthropicChat(res, options, parentMessageId, history_messages)
      .set_user_id(user_id)
      .add_finish_handler(SAVE_MESSAGE_HANDLER)
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
      .chat({
        role: 'user',
        content: prompt
      });
  }

  await Action.add(user_id, ActionTypeEnum.CHAT, utils.getClientIP(req), `对话(${options.model})`);
});

router.post('/:supplier/images/generations', async (req, res) => {
  const user_id = req?.user_id;
  const supplier = req.params.supplier;
  if (!user_id || !supplier) {
    res.json(ApiResponse.miss());
    return;
  }
  const ip = utils.getClientIP(req);
  const user = await User.findByPk(user_id, {
    raw: true,
  });
  if (!user) {
    res.json(ApiResponse.error(500, req.t('用户不存在')));
    return;
  }
  if (user.integral <= 0) {
    res.json(ApiResponse.error(500, req.t('积分不足')));
    return;
  }
  if (supplier === 'openai') {
    const {prompt, n = 1, width = 256, height = 256, response_format = 'url'} = req.body;
    const size = `${width}x${height}` as CreateImageRequestSizeEnum;
    const openai = supplierClientAgent.getRandomClient('dall-e', user_id)[1] as OpenAIApiProxy;
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
    Action.add(user_id, ActionTypeEnum.DRAW, ip, `openai绘画(${size})`);
    res.json(ApiResponse.success(response.data?.data));
  } else if (supplier === 'stability') {
    const {model, ...params} = req.body;
    logger.debug(`stability generation params: ${JSON.stringify(params)} model: ${model}`);
    const stability = supplierClientAgent.getRandomClient(model, user_id)[1] as StabilityProxy;
    await stability.textToImage(model, params).then((response) => {
      res.json(ApiResponse.success(response.data.artifacts));
      Action.add(user_id, ActionTypeEnum.DRAW, ip, `stability绘画(${model})`);
    }).catch((e) => {
      let response = e.response;
      if (response) {
        logger.error(response.data);
      } else {
        logger.error(e);
      }
      res.json(ApiResponse.error(500, req.t('生成失败')));
    });
  } else {
    res.json(ApiResponse.error(500, req.t('supplier not found')));
  }
})

export default router;
