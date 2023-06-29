import {Router} from "express";
import ApiResponse from "../../utils/response";
import {User} from "../../models/User";
import {Config, ConfigNameEnum} from "../../models/Config";
import {Message} from "../../models/Message";
import {ChatCompletionRequestMessageRoleEnum} from "openai";
import {Chat} from "../../chatgpt/Chat";
import {Plugin} from "../../models/Plugin";
import {Functions} from "../../models/Functions";
import utils from "../../utils";
import {UserInstalledPlugin} from "../../models/UserInstalledPlugin";
import {sequelize} from "../../config/db";
import {getRandomClient} from "../../chatgpt";
import {Action, ActionTypeEnum} from "../../models/Action";
import {RedemptionCodeTypeEnum} from "../../models/RedemptionCode";
import {Turnover} from "../../models/Turnover";
import {getLogger} from "../../utils/logger";
import {GPTTokens} from "gpt-tokens";
import {ChatCompletionRequestMessage} from "openai/api";


const router = Router();
const logger = getLogger('routes:user:openai');

router.post('/chat/completions', async (req, res, next) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
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
  if (!(user!.integral! > 0 || user!.vip_expire_time >= new Date())) {
    res.json(ApiResponse.error(500, req.t('余额不足')));
    return;
  }
  const {prompt, parentMessageId, debug} = req.body;
  const options = {
    ...req.body.options,
    stream: true,
  };

  if (options.model.includes('gpt-4') && user!.svip_expire_time! && user!.integral! <= 0) {
    res.json(ApiResponse.error(500, req.t('GPT4为超级会员使用或用积分')));
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
        role: message.role! as ChatCompletionRequestMessageRoleEnum,
        content: message.content || ''
      }
    }).reverse();
  });

  // addUsageCheckTask({...token});

  await new Chat(history_messages, options, res, parentMessageId)
    .init_functions(user.installed_plugins || [])
    .setDebug(debug)
    .add_finish_callback(async (chatCompletions: ChatCompletionRequestMessage[]) => {
      let completionResponseMessages = chatCompletions
        .filter((item) => item.role === ChatCompletionRequestMessageRoleEnum.Assistant && item.content && item.content.length > 0);
      await Message.bulkCreate([
        {
          user_id,
          role: 'user',
          content: prompt,
          parent_message_id: parentMessageId,
          ...options
        },
        ...completionResponseMessages.map((item) => {
          return {
            user_id,
            role: item.role,
            content: item.content,
            parent_message_id: parentMessageId,
            ...options
          } as Message
        }),
      ])

      let todayTime = new Date();

      if ((options.model.includes('gpt-4') && user.svip_expire_time < todayTime) ||
        (!options.model.includes('gpt-4') && user.vip_expire_time < todayTime)) {
        let usageInfo = new GPTTokens({
          model: options.model,
          // @ts-ignore
          messages: [
            // @ts-ignore
            ...history_messages,
            {
              // @ts-ignore
              role: 'user',
              content: prompt
            },
            ...completionResponseMessages
          ]
        });
        const tokens = usageInfo.usedTokens;
        const ai3_ratio = (await Config.getConfig(ConfigNameEnum.AI3_RATIO)) || 0;
        const ai4_ratio = (await Config.getConfig(ConfigNameEnum.AI4_RATIO)) || 0;
        let ratio = Number(ai3_ratio);
        if (options.model.indexOf('gpt-4') !== -1) {
          ratio = Number(ai4_ratio);
        }
        const integral = ratio ? Math.ceil(tokens / ratio) : 0;
        await User.updateUserVIP({
          user_id: user_id,
          type: RedemptionCodeTypeEnum.INTEGRAL,
          value: integral,
          operate: 'decrement'
        });
        await Turnover.add(user_id, `{对话}(${options.model})`, `-${integral}{积分}`);
      }

      if (!res.writableEnded) {
        res.end();
      }
    })
    .chat({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: prompt
    });

  await Action.add(user_id, ActionTypeEnum.CHAT, utils.getClientIP(req), `对话(${options.model})`);

});

router.post('/images/generations', async (req, res, next) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {prompt, n = 1, size = '256x256', response_format = 'url'} = req.body;
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
  const [_, openai] = getRandomClient('dall-e');
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
  if (vipExpireTime < todayTime) {
    await User.updateUserVIP({
      user_id: user_id,
      type: RedemptionCodeTypeEnum.INTEGRAL,
      value: deductIntegral,
      operate: 'decrement'
    });
    await Turnover.add(user_id, `{绘画} ${size}`, `-${deductIntegral}{积分}`);
  }
  Action.add(user_id, ActionTypeEnum.DRAW, ip, `绘画(${size})`);
  res.json(ApiResponse.success(response.data?.data));
})

router.get('/plugins', async (req, res, next) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {page, page_size} = utils.paging(req.query.page, 6);
  const type = req.query.type || 'market';

  const include = [
    {
      model: User,
      as: 'creator'
    }
  ];
  if (type === 'installed') {
    include.push({
      model: User,
      as: 'installed_users',
      where: {
        id: user_id
      },
      attributes: [] // Exclude user attributes from the result
    } as any)
  }
  const plugins = await Plugin.findAndCountAll({
    where: type === 'my_plugin' ? {
      creator_id: user_id
    } : {
      status: 1
    },
    attributes: {
      include: [
        [
          sequelize!.literal(`(
            SELECT COUNT(*) FROM user_installed_plugin
            WHERE user_installed_plugin.plugin_id = Plugin.id
            AND user_installed_plugin.user_id = ${user_id}
          )`),
          'installed'
        ]
      ],
    },
    include: include,
    offset: page * page_size,
    limit: page_size
  });

  // Add 'installed' field to each plugin indicating if it's installed
  const modifiedPlugins = plugins.rows.map((plugin) => {
    const isInstalled = (plugin.get('installed') as number || 0) > 0;
    return {
      ...plugin.toJSON(),
      installed: isInstalled,
    };
  });

  res.json(ApiResponse.success({
    ...plugins,
    rows: modifiedPlugins,
  }));
})

router.get('/plugin/:id', async (req, res, next) => {
  const {id} = req.params;
  if (!id) {
    res.json(ApiResponse.miss());
    return;
  }
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id, {
    include: [{
      model: User,
      as: 'creator'
    }, {
      model: Functions,
      as: 'functions'
    }
    ],
    attributes: {
      include: [
        [
          sequelize!.literal(`(
            SELECT COUNT(*) FROM user_installed_plugin
            WHERE user_installed_plugin.plugin_id = Plugin.id
            AND user_installed_plugin.user_id = ${user_id}
          )`),
          'installed'
        ]
      ],
    },
  });
  res.json(ApiResponse.success({
    ...plugin?.toJSON(),
    installed: ((plugin?.get('installed') as number || 0) > 0) as boolean,
  }));
})

router.post('/plugin/:id/release', async (req, res, next) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  if (plugin.getDataValue('creator_id') !== user_id) {
    res.json(ApiResponse.error(500, req.t('无权限')));
    return;
  }
  await plugin.update({
    status: 1
  });
  res.json(ApiResponse.success());
})

router.post('/plugin/:id/install', async (req, res, next) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  const user = await User.findByPk(user_id);
  if (!user) {
    res.json(ApiResponse.error(500, req.t('用户不存在')));
    return;
  }
  await UserInstalledPlugin.findOrCreate({
    where: {
      user_id,
      plugin_id: id
    }
  });
  res.json(ApiResponse.success());
});

router.post('/plugin/:id/uninstall', async (req, res, next) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  const user = await User.findByPk(user_id);
  if (!user) {
    res.json(ApiResponse.error(500, req.t('用户不存在')));
    return;
  }
  await UserInstalledPlugin.destroy({
    where: {
      user_id,
      plugin_id: id
    }
  });
  res.json(ApiResponse.success());
})

router.post('/plugin', async (req, res, next) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {name, description, avatar} = req.body;
  if (!name || !description) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.create({
    name,
    description,
    avatar,
    creator_id: user_id
  } as Plugin);

  res.json(ApiResponse.success(plugin));
})

router.put('/plugin/:id', async (req, res, next) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  const {name, description, avatar} = req.body;
  if (!name || !description) {
    res.json(ApiResponse.miss());
    return;
  }
  await plugin.update({
    name,
    description,
    avatar,
  } as Plugin);

  res.json(ApiResponse.success(plugin));
})

router.delete('/plugin/:id', async (req, res, next) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  await plugin.destroy();
  res.json(ApiResponse.success());
})

router.post('/plugin/:id/function', async (req, res, next) => {
  const user_id = req?.user_id;
  const {id} = req.params;
  if (!user_id || !id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  const {name, description, parameters, script} = req.body;
  if (!name || !description || !parameters || !script) {
    res.json(ApiResponse.miss());
    return;
  }
  const func = await Functions.create({
    plugin_id: Number(id),
    name,
    description,
    parameters,
    script,
  } as Functions);
  res.json(ApiResponse.success(func));
})

router.put('/plugin/:id/function/:function_id', async (req, res, next) => {
  const user_id = req?.user_id;
  const {id, function_id} = req.params;
  if (!user_id || !id || !function_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  const func = await Functions.findByPk(function_id);
  if (!func) {
    res.json(ApiResponse.error(500, req.t('方法不存在')));
    return;
  }
  const {name, description, parameters, script} = req.body;
  if (!name || !description || !parameters || !script) {
    res.json(ApiResponse.miss());
    return;
  }
  await func.update({
    name,
    description,
    parameters,
    script,
  } as Functions);
  res.json(ApiResponse.success(func));
})

router.delete('/plugin/:id/function/:function_id', async (req, res, next) => {
  const user_id = req?.user_id;
  const {id, function_id} = req.params;
  if (!user_id || !id || !function_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const plugin = await Plugin.findByPk(id);
  if (!plugin) {
    res.json(ApiResponse.error(500, req.t('插件不存在')));
    return;
  }
  const func = await Functions.findByPk(function_id);
  if (!func) {
    res.json(ApiResponse.error(500, req.t('方法不存在')));
    return;
  }
  await func.destroy();
  res.json(ApiResponse.success());
})

export default router;
