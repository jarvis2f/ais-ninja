import AlipaySdk, {AlipaySdkConfig} from "alipay-sdk";
import utils from "./index";

async function precreate(config: AlipaySdkConfig,
                         notify_url: string,
                         out_trade_no: string,
                         total_amount: number,
                         subject: string,
                         body: string,
                         goods_detail: {}): Promise<{
  [p: string]: any;
  msg: string;
  code: number | string;
  sub_msg?: string;
  sub_code?: string
}> {
  const alipaySdk = new AlipaySdk(config);
  const response = await alipaySdk.exec('alipay.trade.precreate', {
    notify_url: notify_url,
    bizContent: {
      out_trade_no,
      subject,
      goods_detail: [goods_detail],
      body,
      total_amount,
      product_code: 'FACE_TO_FACE_PAYMENT'
    } // 业务（API）参数
  });
  return {
    ...response,
    code: response.code === '10000' ? 0 : response.code
  };
}

async function checkNotifySign(config: AlipaySdkConfig, body: {}) {
  const alipaySdk = new AlipaySdk(config);
  const data = utils.filterObjectNull({
    ...body,
    channel: null
  });
  return alipaySdk.checkNotifySign(data);
}

export default {
  precreate,
  checkNotifySign
};
