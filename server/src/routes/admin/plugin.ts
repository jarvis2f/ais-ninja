import {Router} from "express";
import ApiResponse from "../../utils/response";
import path from "path";
import {tmpdir} from "os";
import fs from "fs";
import util from "util";
import simpleGit from "simple-git";
import {Plugin} from "../../models/Plugin";
import {Functions} from "../../models/Functions";
import {getLogger} from "../../utils/logger";
import {sequelize} from "../../config/db";

const router = Router();
const logger = getLogger('admin/plugin');

router.post('/import', async (req, res) => {
  const {url} = req.body;
  if (!url) {
    res.json(ApiResponse.miss());
    return;
  }

  const tmpPath = path.join(tmpdir(), 'ais-plugins');
  logger.debug(`clone ${url} to ${tmpPath}`);

  if (fs.existsSync(tmpPath)) {
    await util.promisify(fs.rm)(tmpPath, {recursive: true}).catch((err) => {
      logger.error(`delete ${tmpPath} failed: ${err}`);
    });
  }

  await simpleGit().clone(url, tmpPath)
    .catch((err) => {
      logger.error(`clone ${url} to ${tmpPath} failed: ${err}`);
      return null;
    });

  logger.debug(`clone ${url} to ${tmpPath} success`);
  const pluginsPath = path.join(tmpPath, 'plugins');
  if (!fs.existsSync(pluginsPath)) {
    throw new Error(`plugins path does not exist: ${pluginsPath}`);
  }

  // Iterate over each folder
  const pluginDirs = fs.readdirSync(pluginsPath, {withFileTypes: true})
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const t = await sequelize!.transaction();
  const plugins: Plugin[] = [];
  try {
    for (const pluginDir of pluginDirs) {
      const pluginPath = path.join(pluginsPath, pluginDir);
      const pluginFiles = await readPluginFiles(pluginPath);

      if (!pluginFiles.desc || !pluginFiles.index || !pluginFiles.pluginJson) {
        logger.warn(`Incomplete files for plugin: ${pluginDir}`);
      }

      const pluginJson = JSON.parse(pluginFiles.pluginJson as string);

      let functions = pluginJson.functions
        .filter((func: any) => {
          if (!func.name || !func.description || !func.parameters) {
            logger.warn(`Incomplete function for plugin: ${pluginDir}`);
            return false;
          }
          return true;
        })
        .map((func: any) => {
          return {
            name: func.name,
            description: func.description,
            parameters: JSON.stringify(func.parameters),
            script: pluginFiles.index as string,
          }
        });

      // Check if the plugin already exists based on the name field
      const existingPlugin = await Plugin.findOne({
        where: {name: pluginJson.name},
        include: [{model: Functions, as: 'functions'}],
        transaction: t,
      });

      let variables: { name: string, value: string }[] = [];
      if (pluginJson.variables) {
        variables = Object.keys(pluginJson.variables).map((key) => {
          return {
            name: key,
            value: pluginJson.variables[key],
          }
        });
      }

      if (existingPlugin) {
        // Update existing plugin
        existingPlugin.set('description', pluginFiles.desc as string);
        existingPlugin.set('avatar', pluginJson.avatar);
        const origin_variables = JSON.parse(existingPlugin.get('variables')) as { name: string, value: string }[];
        variables.forEach((variable) => {
          const origin_variable = origin_variables.find((v) => v.name === variable.name);
          if (!origin_variable) {
            origin_variables.push(variable);
          }
        });
        existingPlugin.set('variables', JSON.stringify(origin_variables));
        await existingPlugin.save({transaction: t});
        // Update functions
        const origin_functions = existingPlugin.get('functions') as Functions[];
        functions.forEach((func: Functions) => {
          const origin_func = origin_functions.find((f) => f.get('name') === func.name);
          if (!origin_func) {
            func.plugin_id = existingPlugin.id;
            Functions.create(func, {transaction: t});
          } else {
            origin_func.set('description', func.description);
            origin_func.set('parameters', func.parameters);
            origin_func.set('script', func.script);
            origin_func.save({transaction: t});
          }
        });
        plugins.push(existingPlugin);
      } else {
        // Insert new plugin
        const newPlugin = await Plugin.create({
          name: pluginJson.name,
          description: pluginFiles.desc as string,
          avatar: pluginJson.avatar,
          creator_id: 10000,
          status: 0,
          variables: JSON.stringify(variables),
          functions: functions,
        } as Plugin, {
          include: [{model: Functions, as: 'functions'}],
          transaction: t,
        });
        plugins.push(newPlugin);
      }
    }

    await t.commit();

    logger.info(`plugins count: ${plugins.length}`);

    res.json(ApiResponse.success({}, req.t(`导入成功`)));
  } catch (error) {
    await t.rollback(); // Rollback the transaction in case of an error
    logger.error(`Transaction failed: ${error}`);
    res.json(ApiResponse.error(500, req.t(`导入失败`)));
  }
})

async function readPluginFiles(pluginPath: string) {
  const descPath = path.join(pluginPath, 'desc.md');
  const indexPath = path.join(pluginPath, 'index.js');
  const jsonPath = path.join(pluginPath, 'plugin.json');

  const readFile = util.promisify(fs.readFile);

  const [descContent, indexContent, jsonContent] = await Promise.all([
    readFile(descPath, 'utf8').catch(() => null),
    readFile(indexPath, 'utf8').catch(() => null),
    readFile(jsonPath, 'utf8').catch(() => null)
  ]);

  return {
    desc: descContent,
    index: indexContent,
    pluginJson: jsonContent
  };
}

export default router;
