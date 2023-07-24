import {Sequelize} from 'sequelize-typescript';
import path from "path";
import {getLogger} from "../utils/logger";
import {Turnover} from "../models/Turnover";
import {User} from "../models/User";
import {Signin} from "../models/Signin";
import {Message} from "../models/Message";
import {Order} from "../models/Order";
import {Plugin} from "../models/Plugin";
import {Functions} from "../models/Functions";
import {UserInstalledPlugin} from "../models/UserInstalledPlugin";
import {config} from "./config";
import pino from "pino";
import {UserApiKey} from "../models/UserApiKey";
import {UserApiKeyUsage} from "../models/UserApiKeyUsage";

const models_path = path.join(__dirname, '../models/*.ts');
let logger = getLogger('db');
export let sequelize : Sequelize | undefined;

export async function initSequelize() {
  if (!sequelize) {
    sequelize = new Sequelize(
      config!.getConfigValue('database.name') || 'ais',
      config!.getConfigValue('database.user') as string,
      config!.getConfigValue('database.password'),
      {
        host: config!.getConfigValue('database.host'),
        port: Number(config!.getConfigValue('database.port')),
        dialect: 'mysql',
        timezone: '+08:00',
        logging: (msg: string) => logger.debug(msg),
        models: [models_path],
        dialectOptions: {
          dateStrings: true,
          typeCast: true
        }
      }
    );

    binding_relation();

    // Wait for the database connection to succeed
    await sequelize.authenticate();
    logger.info('Database connected');

    if (config!.getConfigValue('database.sync') === 'true') {
      // sync database
      await sync();
    }

  }
}

function binding_relation() {
  if (!sequelize) {
    throw new Error('sequelize not initialized');
  }
  Turnover.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', as: 'user'});
  Signin.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', as: 'user'});
  Message.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', as: 'user'});
  Order.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', as: 'user'});
  Plugin.hasMany(Functions, {foreignKey: 'plugin_id', sourceKey: 'id', as: 'functions'});
  Plugin.belongsTo(User, {foreignKey: 'creator_id', targetKey: 'id', as: 'creator'});
  User.hasMany(Plugin, {foreignKey: 'creator_id', sourceKey: 'id', as: 'plugins'});
  User.hasMany(UserApiKey, {foreignKey: 'user_id', sourceKey: 'id', as: 'api_keys'})
  UserApiKeyUsage.belongsTo(UserApiKey, {foreignKey: 'api_key_id', targetKey: 'id', as: 'api_key'});
  UserApiKeyUsage.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', as: 'user'});
  User.belongsToMany(Plugin, {through: UserInstalledPlugin, foreignKey: 'user_id', as: 'installed_plugins'});
  Plugin.belongsToMany(User, {through: UserInstalledPlugin, foreignKey: 'plugin_id', as: 'installed_users'});
}

async function sync() {
  if (!sequelize) {
    throw new Error('sequelize not initialized');
  }
  await sequelize.sync({
    logging: (() => {
      let db_sync_logger: pino.Logger;
      return (msg) => {
        (db_sync_logger = db_sync_logger || getLogger('db_sync')).debug(msg);
      };
    })(),
  }).then(() => {
    logger.info('Database synced');
    User.initAdministrator().then((initialized) => {
      if (initialized) {
        let admin = initialized as {account: string, password: string};
        logger.info(`Administrator initialized: ${admin.account} \ ${admin.password}`);
      }
    });
  }).catch((err) => {
    logger.error(`Database sync failed: ${err}`);
  });
}
