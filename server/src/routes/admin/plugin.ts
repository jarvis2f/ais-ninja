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

const router = Router();
const logger = getLogger('admin/plugin');

router.post('/import', async (req, res, next) => {
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

  const plugins: Plugin[] = [];
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

    plugins.push({
      name: pluginJson?.name,
      description: pluginFiles.desc as string,
      avatar: pluginJson?.avatar,
      creator_id: 10000,
      status: 1,
      functions:functions
    } as Plugin);
  }

  await Plugin.bulkCreate(plugins, {
    include: [{
      model: Functions,
      as: 'functions'
    }]
  });

  logger.info(`plugins count: ${plugins.length}`);
  logger.debug(`plugins: ${JSON.stringify(plugins)}`)

  res.json(ApiResponse.success({}, req.t(`导入成功`)));
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
