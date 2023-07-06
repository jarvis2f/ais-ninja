import Stripe from 'stripe';
import SessionCreateParams = Stripe.Checkout.SessionCreateParams;

async function precreate(config: {
  key: string,
  success_url: string,
  cancel_url: string
}, line_items: SessionCreateParams.LineItem[], out_trade_no: string, customer_email?: string): Promise<Stripe.Checkout.Session> {
  const stripe = new Stripe(config.key, {
    apiVersion: '2022-11-15',
  });
  const session = await stripe.checkout.sessions.create({
    success_url: config.success_url,
    cancel_url: config.cancel_url,
    payment_method_types: ['alipay', 'wechat_pay'],
    payment_method_options: {
      wechat_pay: {
        client: 'web',
      }
    },
    customer_email: customer_email,
    mode: 'payment',
    metadata: {
      order_id: out_trade_no,
    },
    line_items: line_items,
  });
  return session;
}

async function constructEvent(config: {
  key: string,
  success_url: string,
  cancel_url: string,
  webhook_secret: string
}, req: any): Promise<Stripe.Event> {
  const stripe = new Stripe(config.key, {
    apiVersion: '2022-11-15',
  });
  let signature = req.headers['stripe-signature'];
  if (!signature)
    throw new Error("No signature");
  return stripe.webhooks.constructEvent(req.body, signature, config.webhook_secret);
}

async function checkChargeIsSuccess(config: {
  key: string,
  success_url: string,
  cancel_url: string,
  webhook_secret: string
}, charge_id: string): Promise<boolean> {
  const stripe = new Stripe(config.key, {
    apiVersion: '2022-11-15',
  });
  return stripe.paymentIntents.retrieve(charge_id).then(charge => {
    return charge.status === 'succeeded';
  });
}

export default {
  precreate,
  constructEvent,
  checkChargeIsSuccess
}
