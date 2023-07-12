import './express-extension';
import {initSequelize} from './config/db';
import {initRedisClient} from './config/redis';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/index';
import auth from './middleware/auth';
import error_handler from "./middleware/error_handler";
import {getLogger} from "./utils/logger";
import res_handler from "./middleware/res_handler";
import {initClients} from "./ai";
import {config} from "./config/config";
import {initPlugin} from "./ai/openai/plugins";
import {relay_auth} from "./middleware/relay_auth";
import getLimiter from "./middleware/relay_limiter";
import {i18n} from "./middleware/i18n";

let logger = getLogger('app');

export const startServer = async () => {
  try {
    // 初始化数据库
    await initSequelize();
    await initRedisClient();

    // 初始化 AI clients
    initClients();

    // 初始化插件
    initPlugin().then(() => {
      logger.info("Plugins initialized");
    });

    const app = express();
    app.use(await i18n());
    app.use(res_handler);
    app.use(cors());
    app.all('/api/u/stripe/webhook', express.raw({type: 'application/json'}));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(auth);
    app.use('/v1/*', getLimiter())
    app.use(relay_auth);
    routes(app);
    app.use(error_handler)
    app.listen(config!.getConfigValue('server.port'), () =>
      logger.info(`Server running on port ${config!.getConfigValue('server.port')}`)
    );
  } catch (error) {
    logger.error('Failed to start the server:' + error);
    process.exit(1)
  }
};
