import utils from './'
import * as querystring from "querystring";
import fetch from 'node-fetch';
import crypto from "crypto";
import {getLogger} from "./logger";

const logger = getLogger('yipay');

async function precreate(base: { api: string, key: string }, config: {}, options: {}): Promise<{
  code: number | any,
  pay_url: string | any
}> {
  const data = utils.filterObjectNull({
    device: 'pc',
    ...config,
    ...options
  });
  logger.debug(data);
  const sortedData = utils.ksort(data);
  const query = utils.buildQueryString(sortedData);
  const sign = crypto.createHash('md5').update(query + base.key).digest('hex');
  const formBody = querystring.stringify({
    sign,
    sign_type: 'MD5',
    ...data
  });
  const api = base.api + '/pay/apisubmit';
  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body: formBody
  });
  const json = await response.json() as {
    code?: number,
    payurl?: string
    qrcode?: string
    urlscheme?: string
  };
  logger.debug(`支付结构:${json}`);
  return {
    code: json.code === 1 ? 0 : json.code,
    pay_url: json.payurl || json.qrcode || json.urlscheme
  };
}

async function checkNotifySign(params: { sign: string }, key: string) {
  const sign = params.sign;
  const data = utils.filterObjectNull({
    ...params,
    channel: null,
    sign: null,
    sign_type: null
  });
  const sortedData = utils.ksort(data);
  const query = utils.buildQueryString(sortedData);
  const newSign = crypto.createHash('md5').update(query + key).digest('hex');
  return sign === newSign;
}

export default {
  precreate,
  checkNotifySign
};
