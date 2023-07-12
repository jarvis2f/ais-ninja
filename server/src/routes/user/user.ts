import {Router} from "express";
import {User, UserLevelEnum} from "../../models/User";
import ApiResponse from "../../utils/response";
import utils from "../../utils";
import alipay from "../../utils/alipay";
import {redisClient} from "../../config/redis";
import {Action, ActionTypeEnum} from "../../models/Action";
import {Signin} from "../../models/Signin";
import {OAuth2Client} from "google-auth-library";
import {UserSocial, UserSocialTypeEnum} from "../../models/UserSocial";
import {randomUUID} from "crypto";
import dayjs from "dayjs";
import {Product} from "../../models/Product";
import {Payment} from "../../models/Payment";
import {RedemptionCode} from "../../models/RedemptionCode";
import {Turnover} from "../../models/Turnover";
import {Config, ConfigNameEnum} from "../../models/Config";
import {Order} from "../../models/Order";
import yipay from "../../utils/yipay";
import {Notification} from "../../models/Notification";
import {config} from "../../config/config";
import {getLogger} from "../../utils/logger";
import {Token} from "../../models/Token";
import Stripe from "stripe";
import stripe from "../../utils/stripe";
import {Op} from "sequelize";
import {UserApiKey} from "../../models/UserApiKey";
import {UserApiKeyUsage} from "../../models/UserApiKeyUsage";

const router = Router();
const logger = getLogger('routes:user:user');

router.get("/config", async (req, res) => {
  let login_methods = config?.getConfigValue('login_methods') as string[];
  res.json(ApiResponse.success({
    shop_introduce: await Config.getConfig(ConfigNameEnum.SHOP_INTRODUCE),
    user_introduce: await Config.getConfig(ConfigNameEnum.USER_INTRODUCE),
    invitee_reward: await Config.getConfig(ConfigNameEnum.INVITEE_REWARD),
    inviter_reward: await Config.getConfig(ConfigNameEnum.INVITER_REWARD),
    notifications: Notification.getNormalNotifications(),
    social: {
      google: {
        client_id: login_methods.indexOf('google') !== -1 && config?.getConfigValue('social.google.client_id')
      }
    },
    login_methods: login_methods,
    models: await Token.getChatModels(),
    server_domain: config?.getConfigValue('server.domain'),
  }));
});

// 注册登录
router.post('/login', async (req, res) => {
  const {account, code, password, invite_code} = req.body;
  if (!account || (!code && !password)) {
    res.json(ApiResponse.miss());
    return;
  }
  let invite_by = 0;
  if (invite_code) {
    invite_by = await User.getUserByInviteCode(invite_code).then(user => user?.get('id')) || 0;
  }
  let user = await User.getUserByAccount(account);
  if (code) {
    if (code != await redisClient?.get(`code:${account}`)) {
      res.json(ApiResponse.error(400, req.t('验证码不正确')));
      return;
    }
    await redisClient?.del(`code:${account}`);
  } else if (password) {
    if (!user || !await user.checkPassword(password)) {
      res.json(ApiResponse.error(400, req.t('账号或密码不正确')));
      return;
    }
  }
  const ip = utils.getClientIP(req);
  if (!user) {
    user = await User.add(account, password, ip, undefined, undefined, invite_by);
  }
  await doLogin(user!, ip, res);
});

async function doLogin(user: User, ip: string, res: any) {
  await Action.add(user.id, ActionTypeEnum.LOGIN, ip, '登录页面');
  let token = user.generateToken();
  await redisClient?.setEx(`token:${token}`, 60 * 60 * 24, JSON.stringify(user));
  res.json(ApiResponse.success({
    token: token,
    user_info: {
      ...user.toJSON(),
      is_signin: await Signin.isSigninToday(user.id)
    }
  }));
}

// 社交登录注册
router.post('/login/social', async (req, res) => {
  const {type, credential, invite_code} = req.body;
  if (!type || !credential) {
    res.json(ApiResponse.miss());
    return;
  }
  if (type !== 'google') {
    res.json(ApiResponse.error(400, req.t('暂不支持该登录方式')));
    return;
  }
  let invite_by = 0;
  if (invite_code) {
    invite_by = await User.getUserByInviteCode(invite_code).then(user => user?.get('id')) || 0;
  }
  let googleClientId = config?.getConfigValue('social.google.client_id');
  if (!googleClientId) {
    logger.error('social login fail: social.google.client_id is not set');
    res.json(ApiResponse.server_error());
    return;
  }
  const loginTicket = await new OAuth2Client(googleClientId)
    .verifyIdToken({idToken: credential});
  const payload = loginTicket?.getPayload();
  if (!payload) {
    res.json(ApiResponse.error(400, req.t('无效的授权码')));
    return;
  }
  logger.debug(`google payload:${payload}`);

  const {sub: socialId, email, name, picture} = payload;
  let userSocial = await UserSocial.getUserSocial(UserSocialTypeEnum.GOOGLE, socialId);
  let user = await User.getUserByAccount(email!);

  if (!user) {
    user = await User.add(email!, randomUUID(), utils.getClientIP(req), name, picture, invite_by);
  }
  if (!userSocial) {
    await UserSocial.add(user!.id, UserSocialTypeEnum.GOOGLE, socialId);
  }

  await doLogin(user!, utils.getClientIP(req), res);
});

// 获取用户信息
router.get('/user/info', async (req, res) => {
  const user_id = req.user_id!;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const user = await User.findByPk(user_id);
  if (!user) {
    res.json(ApiResponse.error(400, req.t('用户不存在')));
    return;
  }
  res.json(ApiResponse.success({
    ...user.toJSON(),
    is_signin: await Signin.isSigninToday(user.id)
  }));
});

// 更新密码
router.put('/user/password', async (req, res) => {
  const {account, code, password} = req.body;
  const user_id = req.user_id!;
  if (!account || !code || !password || !user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  if (code != await redisClient?.get(`code:${account}`)) {
    res.json(ApiResponse.error(400, req.t('验证码不正确')));
    return;
  }
  await User.updatePassword(user_id, password);
  await Action.add(user_id, ActionTypeEnum.RESET_PASSWORD, utils.getClientIP(req), '重置密码');
  res.json(ApiResponse.success({}, req.t('重置密码成功')));
});

// 获取用户签到日历
router.get('/signin/list', async (req, res) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const today = dayjs();
  const start_time = today.startOf('month').toDate();
  const end_time = today.endOf('month').toDate();
  res.json(ApiResponse.success(await Signin.getUserSigninList(user_id, start_time, end_time)));
});

// 获取商品
router.get('/product', async (req, res) => {
  const {page, page_size} = utils.paging(req.query.page, 100);
  const products = await Product.getProducts(page, page_size, {status: 1});
  products.rows.forEach((row) => {
    row.title = row.title?.replaceAll(/{(.+?)}/g, (match, p1) => {
      return req.t(p1);
    });
  });
  const pay_types = await getPayments();
  res.json(ApiResponse.success({
    products: products.rows,
    pay_types
  }));
});

async function getPayments(): Promise<string[]> {
  const payments = await Payment.findAll({
    where: {
      status: 1
    }
  });
  let payTypes: string[] = [];
  for (const payment of payments) {
    const json = payment.toJSON();
    if (json?.channel === 'stripe') {
      payTypes = payTypes.concat(['stripe']);
      continue;
    }
    const types = json?.types?.split(',');
    payTypes = payTypes.concat(types!);
  }
  return [...new Set([...payTypes])];
}

// 使用卡密
router.post('/use_redemption_code', async (req, res) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {key} = req.body;
  const redemption_code = await RedemptionCode.findOne({
    where: {
      key: key
    },
    raw: true
  });
  if (!redemption_code) {
    res.json(ApiResponse.error(400, req.t('卡密不存在')));
    return;
  }
  if (redemption_code.user_id || redemption_code.status === 1) {
    res.json(ApiResponse.error(400, req.t('卡密已被使用')));
    return;
  }
  if (redemption_code.status === 2) {
    res.json(ApiResponse.error(400, req.t('卡密已过期')));
    return;
  }
  if (redemption_code.end_time && redemption_code.end_time < new Date()) {
    res.json(ApiResponse.error(400, req.t('卡密已过期')));
    return;
  }
  const ip = utils.getClientIP(req);
  let affectedCount = await RedemptionCode.update({user_id, status: 1, ip},
    {
      where: {
        id: redemption_code.id,
        key
      }
    });
  if (!affectedCount[0]) {
    res.json(ApiResponse.error(500, req.t('使用卡密失败，请稍后再试')));
    return;
  }
  await Action.add(user_id, ActionTypeEnum.USE_REDEMPTION_CODE, ip, '使用卡密');

  const type = redemption_code.type === 'day' ? 2 : 1;
  const typeText = redemption_code.type === 'day' ? (
    UserLevelEnum[redemption_code.level!] + '{天}') : '{积分}';

  await User.updateUserIntegralOrLevelTime({
    user_id: user_id,
    quantity: Number(redemption_code.value),
    type: type,
    describe: `{卡密充值} ${typeText}`,
    level: type == 2 ? redemption_code.level! : undefined,
  });

  res.json(ApiResponse.success({}, req.t('使用卡密成功')));
});

// 获取用户使用记录
router.get('/turnover', async (req, res) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {page, page_size} = utils.paging(req.query.page, 100);

  const turnovers = await Turnover.getUserTurnovers(page, page_size, {
    user_id
  });
  turnovers.rows.forEach((row) => {
    // Convert {} to the corresponding language
    row.describe = row.describe?.replaceAll(/{(.+?)}/g, (match, p1) => {
      return req.t(p1);
    });
    row.value = row.value?.replaceAll(/{(.+?)}/g, (match, p1) => {
      return req.t(p1);
    });
  });
  res.json(ApiResponse.success(turnovers));
});

// 签到
router.post('/signin', async (req, res) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const isSignin = await Signin.isSigninToday(user_id);
  if (isSignin) {
    res.json(ApiResponse.error(400, req.t('今日已经签到了')));
    return;
  }
  const signin_reward = await Config.getConfig(ConfigNameEnum.SIGNIN_REWARD) || 0;

  const ip = utils.getClientIP(req);
  await Action.add(user_id, ActionTypeEnum.SIGNIN, ip, '签到');
  await Signin.add(user_id, ip);
  await User.updateUserIntegralOrLevelTime({
    user_id: user_id,
    quantity: Number(signin_reward),
    type: 1,
    describe: '{签到奖励}'
  });
  res.json(ApiResponse.success({}, `${req.t('签到成功')} +${signin_reward}${req.t('积分')}`));
});

// 创建支付订单
router.post('/pay/precreate', async (req, res) => {
  const user_id = req?.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  let user = await User.findByPk(user_id, {raw: true});
  if (!user) {
    res.json(ApiResponse.error(400, req.t('用户不存在')));
    return;
  }
  const {quantity = 1, pay_type, product_id} = req.body;
  if (!pay_type || !product_id) {
    res.json(ApiResponse.miss());
    return;
  }
  // 获取商品信息
  const product = await Product.findByPk(product_id, {raw: true});
  if (!product) {
    res.json(ApiResponse.error(400, req.t('商品不存在')));
    return;
  }
  // 获取支付信息
  const paymentInfo = await Payment.findOne({
    // where (types like '%pay_type%' or channel = 'pay_type') and status = 1
    where: {
      [Op.or]: [
        {
          types: {
            [Op.like]: `%${pay_type}%`
          },
        },
        {
          channel: pay_type
        },
      ],
      status: 1
    },
    raw: true
  });
  if (!paymentInfo) {
    res.json(ApiResponse.error(400, req.t('支付信息未配置')));
    return;
  }
  const out_trade_no = utils.generateSnowflakeId()();
  const responseData = {
    channel: paymentInfo.channel,
    order_id: out_trade_no,
    pay_url: '',
    pay_type
  };
  const ip: string = utils.getClientIP(req);
  const notifyUrl = `https://${req.get('host')?.split(':')[0]}/api/pay/notify?channel=${paymentInfo.channel}`;
  const amount = product.price / 100;
  const paymentParams = JSON.parse(paymentInfo.params);
  const paramsStringify = JSON.stringify({
    order_id: String(out_trade_no),
    product_id,
    user_id,
    payment_id: paymentInfo.id
  });
  await Action.add(user_id, ActionTypeEnum.PAY_ORDER, ip, '创建支付订单');
  if (paymentInfo.channel === 'alipay') {
    const alipayPrecreate = await alipay.precreate(
      paymentParams,
      notifyUrl,
      out_trade_no,
      amount,
      product.title,
      paramsStringify,
      {
        goods_id: product.id,
        goods_name: product.title,
        price: amount,
        quantity
      }
    );
    if (alipayPrecreate.code) {
      res.json(ApiResponse.error(400, req.t('支付错误，稍后再试')))
      return;
    }
    responseData.order_id = alipayPrecreate.outTradeNo;
    responseData.pay_url = alipayPrecreate.qrCode;
  }
  if (paymentInfo.channel === 'yipay') {
    const yipayPrecreate = await yipay.precreate({
      api: paymentParams.api,
      key: paymentParams.key
    }, {
      pid: Number(paymentParams.pid),
      return_url: paymentParams?.return_url
    }, {
      type: pay_type,
      out_trade_no,
      notify_url: notifyUrl,
      name: product.title,
      money: amount,
      clientip: ip,
      param: encodeURIComponent(paramsStringify)
    });
    if (yipayPrecreate.code) {
      res.json(ApiResponse.error(400, req.t('支付错误，稍后再试')))
      return;
    }
    responseData.pay_url = yipayPrecreate.pay_url;
  }

  if (paymentInfo.channel === 'stripe') {
    const session = await stripe.precreate(paymentParams,
      [{
        price_data: {
          currency: 'cny',
          product_data: {
            name: product.title,
          },
          unit_amount: product.price,
        },
        quantity: 1,
      }],
      String(out_trade_no),
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(user.account) ? user.account : undefined);
    responseData.pay_url = session.url!;
  }

  await Order.add({
    id: Number(out_trade_no),
    pay_type,
    product_title: product.title,
    product_id,
    trade_status: 'TRADE_AWAIT',
    user_id,
    product_info: JSON.stringify(product),
    channel: paymentInfo.channel,
    payment_id: paymentInfo.id,
    payment_info: JSON.stringify(paymentInfo),
    money: amount,
    params: paramsStringify,
    ip,
    pay_url: responseData.pay_url
  });
  res.json(ApiResponse.success(responseData))
});

// @ts-ignore
const batchModify = async ({order_id, trade_status, trade_no, notify_info, user_id, product_id}) => {
  const product = await Product.findByPk(product_id, {raw: true});
  if (!product)
    return false;
  // 新增用户余额
  if (!await User.addUserProductQuota(user_id, product)) {
    return false;
  }
  // 修改订单信息
  await Order.upsert({
    id: order_id,
    trade_status,
    trade_no,
    notify_info
  });
  return true;
};

const checkNotifySign = async (payment_id: number, data: { sign: string }, channel: string) => {
  const paymentInfo = await Payment.findByPk(payment_id, {raw: true});
  if (!paymentInfo) {
    return false;
  }
  const config = JSON.parse(paymentInfo.params);
  if (channel === 'alipay') {
    const isCheck = await alipay.checkNotifySign(config, data);
    if (!isCheck) {
      return false;
    }
  }
  if (channel === 'yipay') {
    const isCheck = await yipay.checkNotifySign(data, config.key);
    if (!isCheck) {
      return false;
    }
  }
  return true;
};


// 支付通知
router.all('/pay/notify', async (req, res) => {
  try {
    let pay_channel = req.body?.channel;
    if (pay_channel && pay_channel === 'alipay') {
      const {body, out_trade_no, trade_status, trade_no} = req.body;
      const orderInfo = await Order.findByPk(out_trade_no, {raw: true});
      if (!orderInfo || orderInfo.trade_status !== 'TRADE_AWAIT') {
        res.json('fail');
        return;
      }
      const {payment_id, user_id, product_id} = JSON.parse(body);
      const isCheck = await checkNotifySign(payment_id, req.body, pay_channel);
      if (!isCheck) {
        res.json('fail');
        return;
      }
      const modifyResult = await batchModify({
        order_id: out_trade_no,
        trade_status,
        trade_no,
        notify_info: JSON.stringify(req.body),
        user_id,
        product_id
      });
      if (!modifyResult) {
        res.json('fail');
        return;
      }
    }
    if (pay_channel && pay_channel === 'yipay') {
      const {out_trade_no, trade_status, trade_no} = req.query;
      const order = await Order.findOne({
        where: {
          trade_no: out_trade_no! as string
        },
        raw: true
      });
      if (!order || order.trade_status !== 'TRADE_AWAIT') {
        res.json('fail');
        return;
      }
      const {payment_id, user_id, product_id} = JSON.parse(decodeURIComponent(req.query?.param as string));
      const isCheck = await checkNotifySign(payment_id, req.query as { sign: string }, pay_channel);
      if (!isCheck) {
        res.json('fail');
        return;
      }
      const modifyResult = await batchModify({
        order_id: out_trade_no,
        trade_status,
        trade_no,
        notify_info: JSON.stringify(req.query),
        user_id,
        product_id
      });
      if (!modifyResult) {
        res.json('fail');
        return;
      }
    }
  } catch (error) {
    logger.error(`pay notify error: ${error}`);
  }
  res.json('success');
});

router.post('/stripe/webhook',
  async (req, res) => {
    const {payment_id} = req.query;
    try {
      const paymentInfo = await Payment.findByPk(payment_id as string, {raw: true});
      if (!paymentInfo) {
        logger.error(`stripe webhook error: paymentInfo not found, payment_id: ${payment_id}`);
        res.json('fail');
        return;
      }
      const config = JSON.parse(paymentInfo.params);
      const {data, type} = await stripe.constructEvent(config, req);
      if (type !== 'checkout.session.completed') {
        res.json('fail');
        return;
      }
      const session = data.object as Stripe.Checkout.Session;
      if (session.status !== 'complete') {
        logger.error(`stripe webhook error: session status not complete, payment_id: ${payment_id}`);
        res.json('fail');
        return;
      }
      const {payment_intent, metadata} = session;
      if (!metadata || !metadata.order_id) {
        logger.error(`stripe webhook error: metadata or metadata.order_id not found, payment_id: ${payment_id}`);
        res.json('fail');
        return;
      }
      const orderInfo = await Order.findByPk(metadata.order_id, {raw: true});
      if (!orderInfo || orderInfo.trade_status !== 'TRADE_AWAIT') {
        logger.error(`stripe webhook error: orderInfo not found or orderInfo.trade_status not TRADE_AWAIT, payment_id: ${payment_id}`);
        res.json('fail');
        return;
      }
      if (!await stripe.checkChargeIsSuccess(config, payment_intent as string)) {
        logger.error(`stripe webhook error: checkChargeIsSuccess fail, payment_id: ${payment_id}`);
        res.json('fail');
        return;
      }
      const modifyResult = await batchModify({
        order_id: metadata.order_id,
        trade_status: 'TRADE_SUCCESS',
        trade_no: payment_intent,
        notify_info: JSON.stringify(req.body),
        user_id: orderInfo.user_id,
        product_id: orderInfo.product_id
      });
      if (!modifyResult) {
        res.json('fail');
        return;
      }
    } catch (e) {
      logger.error(`pay notify error: ${e}`);
    }
    res.json('success');
  });

router.post('/api-key', async (req, res) => {
  const user_id = req.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {name} = req.body;
  if (!name) {
    res.json(ApiResponse.miss());
    return;
  }
  const apiKey = await UserApiKey.create({
    user_id,
    name,
    api_key: utils.generateApiKey()
  });
  res.json(ApiResponse.success(apiKey));
});

router.get('/api-keys', async (req, res) => {
  const user_id = req.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const apiKeyList = await UserApiKey.findAndCountAll({
    where: {
      user_id
    },
    raw: true
  });
  res.json(ApiResponse.success(apiKeyList));
});

router.delete('/api-key/:id', async (req, res) => {
  const user_id = req.user_id;
  if (!user_id) {
    res.json(ApiResponse.miss());
    return;
  }
  const {id} = req.params;
  if (!id) {
    res.json(ApiResponse.miss());
    return;
  }
  const apiKey = await UserApiKey.findOne({
    where: {
      id,
      user_id
    }
  });
  if (!apiKey) {
    res.json(ApiResponse.miss());
    return;
  }
  const redisKey = `api_key:${apiKey}`;
  await redisClient!.del(redisKey);
  await apiKey.destroy();
  res.json(ApiResponse.success());
});

router.get('/api-keys/usage', async (req, res) => {
  const month = Number(req.query.month || dayjs().month()) - 1;

  const usageList = await UserApiKeyUsage.findAll({
    where: {
      create_time: {
        [Op.gte]: dayjs().month(month).startOf('month').toDate(),
        [Op.lte]: dayjs().month(month).endOf('month').toDate()
      },
      user_id: req.user_id
    },
    raw: true
  });
  const result: {
    date: string,
    usage: number
  }[] = []
  for (let i = 0; i < dayjs().month(month).endOf('month').date(); i++) {
    const date = dayjs().month(month).startOf('month').add(i, 'day').format('YYYY-MM-DD');
    const usage = usageList
      .filter(item => dayjs(item.create_time).format('YYYY-MM-DD') === date)
      .reduce((prev, next) => prev + next.prompt_integral + next.completion_integral, 0);
    result.push({
      date,
      usage
    });
  }

  res.json(ApiResponse.success(result));
});

router.get('/api-keys/usage/daily', async (req, res) => {
  const date = (req.query.date || dayjs().format('YYYY-MM-DD')) as string;
  const usageList = await UserApiKeyUsage.findAll({
    where: {
      create_time: {
        [Op.gte]: dayjs(date).startOf('day').toDate(),
        [Op.lte]: dayjs(date).endOf('day').toDate()
      },
      user_id: req.user_id
    },
    raw: true
  });
  // 按照小时分组，再按照 model 分组，最后按照5分钟为单位分组
  const result: {
    item: string,
    request_count: number,
    // 每小时
    hourly: {
      hour: number,
      request_count: number,
      // model, 5分钟
      models: {
        time: string,
        model: string,
        request_count: number,
        prompt_tokens: number,
        completion_tokens: number,
      }[]
    }[]
  }[] = [];

  // 按照小时分组
  const hourlyUsageList = usageList.reduce((prev, next) => {
    const hour = dayjs(next.create_time).hour();
    if (!prev[hour]) {
      prev[hour] = [];
    }
    prev[hour].push(next);
    return prev;
  }, {} as {
    [key: number]: UserApiKeyUsage[]
  });

  const hourlyResults = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourlyUsage = hourlyUsageList[hour];
    if (!hourlyUsage) {
      continue;
    }
    // 按照 model 分组
    const modelUsageList = hourlyUsage.reduce((prev, next) => {
      if (!prev[next.model]) {
        prev[next.model] = [];
      }
      prev[next.model].push(next);
      return prev;
    }, {} as {
      [key: string]: UserApiKeyUsage[]
    });
    const hourlyResult: {
      hour: number,
      request_count: number,
      // model, 5分钟
      models: {
        time: string,
        model: string,
        request_count: number,
        prompt_tokens: number,
        completion_tokens: number,
      }[]
    } = {
      hour,
      request_count: hourlyUsage.length,
      models: []
    };
    for (const model in modelUsageList) {
      const modelUsage = modelUsageList[model];
      // 按照5分钟分组
      const timeUsageList = modelUsage.reduce((prev, next) => {
        const time = dayjs(next.create_time).format('HH:mm');
        if (!prev[time]) {
          prev[time] = [];
        }
        prev[time].push(next);
        return prev;
      }, {} as {
        [key: string]: UserApiKeyUsage[]
      });
      for (const time in timeUsageList) {
        const timeUsage = timeUsageList[time];
        hourlyResult.models.push({
          time,
          model,
          request_count: timeUsage.length,
          prompt_tokens: timeUsage.reduce((prev, next) => prev + next.prompt_tokens, 0),
          completion_tokens: timeUsage.reduce((prev, next) => prev + next.completion_tokens, 0)
        });
      }
    }
    hourlyResults.push(hourlyResult);
  }
  result.push({
    item: 'Language model usage',
    request_count: usageList.length,
    hourly: hourlyResults
  })
  res.json(ApiResponse.success(result));
});

export default router;
