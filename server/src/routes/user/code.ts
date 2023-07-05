import {Router} from "express";
import ApiResponse from "../../utils/response";
import {redisClient} from "../../config/redis";
import mailer from "../../utils/mailer";
import path from "path";
import sms from "../../utils/sms";

const router = Router();
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

router.get('/send', async (req, res) => {
  let source = req.query.source as string;
  let type = req.query.type as string;

  if (type === 'email' && !EMAIL_REGEX.test(source)) {
    res.json(ApiResponse.error(400, req.t('请输入正确的邮箱')));
    return;
  }
  if (type === 'phone' && !/^\d{11}$/.test(source)) {
    res.json(ApiResponse.error(400, req.t('请输入正确的手机号')));
    return;
  }

  const random = String(Math.random()).split('.')[1];
  const code = random.slice(0, 6);
  await redisClient?.setEx(`code:${source}`, 60 * 5, code);

  if (type === 'phone') {
    await sms.send(source, code);
  } else {
    await mailer.sendWithTemplate(source, 'Welcome to AIS!', path.join(__dirname, '../../resource/templates/email_code.html'), {code});
  }

  res.json(ApiResponse.success({}, req.t('发送成功')));
});

router.get('/verify', async (req, res) => {
  throw new Error('Not implemented');
})

export default router;
