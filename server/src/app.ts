import './express-extension';
import {initSequelize} from './config/db';
import {initRedisClient} from './config/redis';
import express from 'express';
import 'express-async-errors';
import i18next from 'i18next';
import i18NexFsBackend from 'i18next-fs-backend';
import i18NextHttpMiddleware from 'i18next-http-middleware';
import cors from 'cors';
import routes from './routes/index';
import auth from './middleware/auth';
import error_handler from "./middleware/error_handler";
import {getLogger} from "./utils/logger";
import res_handler from "./middleware/res_handler";
import {initClients} from "./chatgpt";
import {config} from "./config/config";
import path from "path";

let logger = getLogger('app');

export const startServer = async () => {
  try {
    // 初始化数据库
    await initSequelize();
    await initRedisClient();

    // 初始化 OpenAI clients
    initClients().then(() => {
      logger.info("OpenAI clients initialized");
    }).catch((err) => {
      logger.error("OpenAI clients initialization failed: " + err);
    });

    const app = express();
    app.use(res_handler)
    // app.use(PinoHttp);
    // 初始化 i18next
    await i18next
      .use(i18NexFsBackend)
      .use(i18NextHttpMiddleware.LanguageDetector)
      .init({
        // debug: true,
        backend: {
          loadPath: path.join(__dirname, './locales/{{lng}}.json'), // 指定语言文件路径
        },
        fallbackLng: 'en_US', // 默认语言
        preload: ['en_US', 'zh_CN'], // 预加载的语言
      });
    app.use(i18NextHttpMiddleware.handle(i18next));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(auth);
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
