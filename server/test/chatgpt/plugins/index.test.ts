import {createPlugin, installModule, installModuleIfNeeded, PLUGINS_MODULE_DIR} from "../../../src/chatgpt/plugins";
import * as path from 'path';
import {Configuration, OpenAIApi} from "openai";
import {getRandomClient} from "../../../src/chatgpt";
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env')

});

test('Test VM process.env is defined', async () => {
  await createPlugin(`
function test_env() {
  return process.env.a;
}
  `, {debug: true, log: console.log, env: {a: 'b'}})
    .run('test_env')
    .then((result) => {
      expect(result).toBe('b');
    });
})

test('Execute simple plugin code', async () => {
  await installModuleIfNeeded('pinyin');
  await createPlugin(`
const pinyin_lib = require("pinyin");
async function toPinyin({text, text2}) {
    const p1 = pinyin_lib.pinyin(text, {
        style: pinyin_lib.STYLE_NORMAL
    }).join('');
    const p2 = pinyin_lib.pinyin(text2, {
        style: pinyin_lib.STYLE_NORMAL
    }).join('');
    console.log(p1, p2);
    return p1 + p2;
}
`,
    {debug: true, log: console.log}
  )
    .run('toPinyin', JSON.stringify({text2: '世界', text: '你好'}))
    .then(console.log);
}, 10000);

test('Execute plugin code with sandbox module', async () => {
  await createPlugin('async function SearchIP({ip: ip}) {\n' +
    '  console.log(\'ip\', JSON.stringify(ip));\n' +
    '  return await fetch(`http://ipinfo.io/${ip}/json`)\n' +
    '    .then(res => res.json());\n' +
    '}',
    {debug: true, log: console.log}
  )
    .run('SearchIP', JSON.stringify({ip: '1.1.1.1'}))
    .then(console.log);
});

test('Execute plugin code with external module (dayjs)', async () => {
  await installModuleIfNeeded('dayjs');
  await createPlugin(`
const dayjs = require('dayjs');
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  `,
    {debug: true, log: console.log}
  )
    .run()
    .then(console.log);
});

test('Execute plugin code with external module (lodash)', async () => {
  await installModuleIfNeeded('lodash');
  await createPlugin(`
const _ = require('lodash');
console.log(_.chunk(['a', 'b', 'c', 'd'], 2));
  `,
    {debug: true, log: console.log}
  )
    .run()
    .then(console.log);
});

test('Execute plugin code with external module (puppeteer-core)', async () => {
  await installModuleIfNeeded('puppeteer-core');
  await createPlugin(`
const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080
    }});
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
  `,
    {debug: true, log: console.log}
  )
    .run()
    .then(console.log);
}, 10000);

test('Execute plugin code with external module not allowed', async () => {
  await installModuleIfNeeded('request');
  await createPlugin(`
const request = require('request');
console.log(request('https://api.example.com'));
  `, {debug: true, log: console.log})
    .run()
    .then(console.log).catch((e) => {
      expect(e.message).toBe('Cannot find module \'request\'');
    });
});

test('Execute dangerous plugin code', async () => {
  let error;
  try {
    await createPlugin('async function danger() {\n' +
      '  console.log(\'danger\');\n' +
      '  exec(\'rm -rf /\');\n' +
      '}',
      {debug: true, log: console.log}
    )
      .run('danger')
      .then(console.log);
    error = false;
  } catch (e) {
    error = true;
  }
  expect(error).toBe(true);
});

test('Execute plugin code without specifying function name', async () => {
  const plugin = createPlugin(
    `
    async function greet() {
      console.log('Hello, world!');
      return 'Hello, world!';
    }
    `,
    {debug: true, log: console.log}
  );

  const result = await plugin.run();
  expect(result).toBe('');
});

test('Execute plugin code with empty arguments', async () => {
  const plugin = createPlugin(
    `
    async function echo({ message }) {
      console.log(message);
      return message;
    }
    `,
    {debug: true, log: console.log}
  );

  const result = await plugin.run('echo', JSON.stringify({message: ''}));
  expect(result).toBe('');
});

test('Execute plugin code with invalid JSON arguments', async () => {
  const plugin = createPlugin(
    `
    async function calculate({ num1, num2 }) {
      const sum = num1 + num2;
      console.log(sum);
      return sum;
    }
    `,
    {debug: true, log: console.log}
  );

  await plugin.run('calculate', 'invalid-json').catch(e => {
    expect(e).toBeInstanceOf(Error);
  });
});

test('Execute plugin code with non-existent function name', async () => {
  const plugin = createPlugin(
    `
    async function multiply({ num1, num2 }) {
      const product = num1 * num2;
      console.log(product);
      return product;
    }
    `,
    {debug: true, log: console.log}
  );

  await plugin.run('divide', JSON.stringify({num1: 5, num2: 2})).catch(e => {
    expect(e).toBeInstanceOf(Error);
  });
});

// mock getRandomClient()
jest.mock('../../../src/chatgpt', () => ({
  getRandomClient: jest.fn((...args) => {
    console.log('key', process.env.TEST_OPENAI_API_KEY);
    return [null, new OpenAIApi(new Configuration({apiKey: process.env.TEST_OPENAI_API_KEY}))];
  })
}));

test('use ais.createCompletion function', async () => {
  expect(getRandomClient("text-davinci-002")).toEqual([null, expect.any(OpenAIApi)]);

  const plugin = createPlugin(
    `
    const ais = require('ais');
    async function completion({ text }) {
      return await ais.createCompletion({
        prompt: text
      });
    }
    `,
    {debug: true, log: console.log}
  );

  const result = await plugin.run('completion', JSON.stringify({text: 'Write a tagline for an ice cream shop.'}));
  console.log(result);
  expect(result).not.toBe('');
});

test('Install non-existent module', async () => {
  const moduleName = 'non-existent-module';
  const moduleDir = path.join(PLUGINS_MODULE_DIR, 'non-existent-module');

  const result = await installModule(moduleName, moduleDir);
  expect(result).toBe(false);
});

test('Install existing module', async () => {
  const moduleName = 'pinyin';
  const moduleDir = path.join(PLUGINS_MODULE_DIR, 'pinyin');

  const result = await installModule(moduleName, moduleDir);
  expect(result).toBe(true);
});

