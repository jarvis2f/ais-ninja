import ali_sms, {SendSmsRequest} from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import {config} from "../config/config";
import {getLogger} from "./logger";

let sms_client: ali_sms;
const logger = getLogger('utils/sms');

function initSmsClient() {
  if (sms_client) return;
  let ali_config = new $OpenApi.Config({
    // 必填，您的 AccessKey ID
    accessKeyId: config?.getConfigValue('ali.access_key_id'),
    // 必填，您的 AccessKey Secret
    accessKeySecret: config?.getConfigValue('ali.access_key_secret'),
  });
  // 访问的域名
  ali_config.endpoint = `dysmsapi.aliyuncs.com`;
  sms_client = new ali_sms(ali_config);
}

export default {
  async send(to: string, code: string) {
    initSmsClient();
    return await sms_client.sendSms(new SendSmsRequest({
      phoneNumbers: to,
      signName: config?.getConfigValue('ali.sms.sign_name'),
      templateCode: config?.getConfigValue('ali.sms.template_code'),
      templateParam: JSON.stringify({
        code: code
      })
    })).then((result) => {
      logger.debug(result);
      return result.statusCode === 200 && result.body?.code === 'OK';
    }).catch((ex) => {
      logger.error(ex);
      return false;
    });
  }
}
