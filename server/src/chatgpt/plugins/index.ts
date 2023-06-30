import * as fs from 'fs';
import * as path from 'path';
import * as util from "util";
import {NodeVM} from 'vm2';
import {getLogger} from "../../utils/logger";
import fetch from 'node-fetch';

const exec = util.promisify(require('child_process').exec);

export const PLUGINS_MODULE_DIR = path.join(__dirname, '../../../../plugins');

const logger = getLogger('plugins');

interface Options {
  debug?: boolean;
  log?: (...args: any[]) => void;
}

const available_modules = ['dayjs', 'pinyin', 'lodash', 'puppeteer-core'];

export function createPlugin(script: string, options: Options) {
  const pluginsModulesDir = path.join(PLUGINS_MODULE_DIR, 'node_modules');
  logger.debug(`Plug-in module installation directory：${pluginsModulesDir}`);
  const vm = new NodeVM({
    console: 'redirect',
    sandbox: {fetch},
    eval: false,
    wasm: false,
    require: {
      external: available_modules,
      root: PLUGINS_MODULE_DIR,
    },
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
