import * as fs from 'fs';
import * as path from 'path';
import * as util from "util";
import {makeResolverFromLegacyOptions, NodeVM} from 'vm2';
import {getLogger} from "../../utils/logger";
import fetch from 'node-fetch';
import {CreateCompletionRequest} from "openai/api";
import {getRandomClient} from "../index";
import {CreateChatCompletionRequest} from "openai";

const exec = util.promisify(require('child_process').exec);

export const PLUGINS_MODULE_DIR = path.join(__dirname, '../../../../plugins');

const logger = getLogger('plugins');

interface Options {
  debug?: boolean;
  env?: { [key: string]: string };
  log?: (...args: any[]) => void;
  progress?: (content: string) => void;
}

const available_modules = ['dayjs', 'pinyin', 'lodash', 'puppeteer-core', 'jsdom'];

const resolve = makeResolverFromLegacyOptions({
  external: available_modules,
  root: PLUGINS_MODULE_DIR,
  mock: {
    ais: {
      createCompletion: createCompletion,
      createChatCompletion: createChatCompletion,
    }
  },
})

export function createPlugin(script: string, options: Options) {
  const pluginsModulesDir = path.join(PLUGINS_MODULE_DIR, 'node_modules');
  logger.debug(`Plug-in module installation directory：${pluginsModulesDir}`);

  let ais_progress = (_: string) => {
  };

  if (options.progress) {
    ais_progress = options.progress;
  }

  const vm = new NodeVM({
    console: 'redirect',
    sandbox: {fetch, URLSearchParams, ais_progress},
    eval: false,
    wasm: false,
    require: resolve,
    env: options.env,
    wrapper: 'commonjs',
  });

  if (options.debug && options.log) {
    vm.on('console.log', (...args: any[]) => {
      options.log!(...args);
    });
  }

  return {
    run: async (funcName?: string, args_str_json?: string): Promise<string> => {
      try {
        if (!funcName) {
          vm.run(script, path.join(PLUGINS_MODULE_DIR, 'plugin.js'));
          return '';
        }
        let args = {};
        if (args_str_json) {
          args_str_json = args_str_json.replace(/\n/g, '').replace(/\\/g, '');
          args = JSON.parse(args_str_json);
        }
        const scriptWithExports = `
      ${script}
      module.exports = { ${funcName} };
    `;
        const func = vm.run(scriptWithExports, path.join(PLUGINS_MODULE_DIR, 'plugin.js'));
        return await func[funcName](args);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
}

export async function installModule(moduleName: string, moduleDir: string): Promise<boolean> {
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir);
    fs.writeFileSync(path.join(moduleDir, 'package.json'), '{}');
  }

  return await exec(`npm install ${moduleName}`, {cwd: moduleDir}).then(({stdout, stderr}: {
    stdout: string,
    stderr: string
  }) => {
    if (stderr) {
      logger.error(`Error: ${stderr}`);
      return false;
    } else {
      logger.info(`stdout: ${stdout}`);
    }
    logger.info(`Module "${moduleName}" has been installed at ${moduleDir}.`);
    return true;
  }).catch((error: any) => {
    if (error) {
      logger.error(`Error: ${error.message}`);
      return false;
    }
  });
}

function moduleExists(moduleName: string, moduleDir: string): boolean {
  const modulePath = path.join(moduleDir, 'node_modules', moduleName);

  try {
    fs.accessSync(modulePath);
    return true;
  } catch (err) {
    return false;
  }
}

export async function installModuleIfNeeded(moduleName: string) {
  const moduleDir = PLUGINS_MODULE_DIR;
  if (!moduleExists(moduleName, moduleDir)) {
    return await installModule(moduleName, moduleDir);
  } else {
    logger.info(`Module "${moduleName}" is already installed.`);
    return true;
  }
}

export function initPlugin() {
  available_modules.forEach((moduleName) => {
    installModuleIfNeeded(moduleName).then();
  });
}

async function createCompletion(createCompletionRequest: CreateCompletionRequest): Promise<string> {
  const request = {
    ...createCompletionRequest,
    model: createCompletionRequest.model || 'text-davinci-002',
  }
  let openAIApi = getRandomClient(request.model)[1];
  return openAIApi.createCompletion(request, {
    transformResponse: (data) => {
      if (logger.isLevelEnabled('debug')) {
        logger.debug(data);
      }
      return JSON.parse(data);
    }
  })
    .then((response) => {
      return response.data.choices?.length > 0 && response.data.choices[0].text || '';
    })
    .catch((error) => {
      logger.error(error);
      error.response && logger.error(error.response.data);
      return '';
    });
}

async function createChatCompletion(createChatCompletionRequest: CreateChatCompletionRequest): Promise<string> {
  const request = {
    ...createChatCompletionRequest,
    stream: false,
    model: createChatCompletionRequest.model || 'gpt-3.5-turbo-16k-0613',
  }
  let openAIApi = getRandomClient(request.model)[1];
  return openAIApi.createChatCompletion(request, {
    transformResponse: (data) => {
      if (logger.isLevelEnabled('debug')) {
        logger.debug(data);
      }
      return JSON.parse(data);
    }
  })
    .then((response) => {
      return response.data.choices && response.data.choices.length > 0 && response.data.choices[0].message?.content || '';
    })
    .catch((error) => {
      logger.error(error);
      error.response && logger.error(error.response.data);
      return '';
    });
}

