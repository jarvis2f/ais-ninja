import {Express} from 'express';
import u_user_router from './user/user';
import u_code_router from './user/code';
import u_ai_router from './user/ai';
import openai_relay_router from './relay/openai';
import anthropic_relay_router from './relay/anthropic';
import stability_relay_router from './relay/stability';
import u_plugin_router from './user/plugin';
import a_config_router from './admin/config';
import a_action_router from './admin/action';
import a_redemption_code_router from './admin/redemption_code';
import a_message_router from './admin/message';
import a_notification_router from './admin/notification';
import a_order_router from './admin/order';
import a_payment_router from './admin/payment';
import a_plugin_router from './admin/plugin';
import a_product_router from './admin/product';
import a_signin_router from './admin/signin';
import a_token_router from './admin/token';
import a_turnover_router from './admin/turnover';
import a_user_router from './admin/user';
import a_usage_router from './admin/usage';
import ApiResponse from "../utils/response";


export default (app: Express) => {
  // client interface
  app.use('/api/u', u_user_router);
  app.use('/api/u/code', u_code_router);
  app.use('/api/u', u_ai_router);
  app.use('/api/u', u_plugin_router);

  // Management interface
  app.use('/api/a/action', a_action_router);
  app.use('/api/a/config', a_config_router);
  app.use('/api/a/message', a_message_router);
  app.use('/api/a/notification', a_notification_router);
  app.use('/api/a/order', a_order_router);
  app.use('/api/a/payment', a_payment_router);
  app.use('/api/a/plugin', a_plugin_router);
  app.use('/api/a/product', a_product_router);
  app.use('/api/a/redemption_code', a_redemption_code_router);
  app.use('/api/a/signin', a_signin_router);
  app.use('/api/a/token', a_token_router);
  app.use('/api/a/turnover', a_turnover_router);
  app.use('/api/a/user', a_user_router);
  app.use('/api/a/usage', a_usage_router);

  // Relay interface
  app.use('/', openai_relay_router, anthropic_relay_router, stability_relay_router);

  app.all('/*', (req, res) => {
    res.status(404).json(ApiResponse.error(404, 'The current access API address does not exist'));
  });
};
