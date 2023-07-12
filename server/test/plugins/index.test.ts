import {createPlugin, initPlugin} from "../../src/ai/openai/plugins";
import * as path from "path";
import * as fs from "fs";

process.env.NODE_ENV = 'local';

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

initPlugin();

export function get_plugin_script(plugin_folder: string): string {
  const script_path = path.join(__dirname, `../../../plugins/${plugin_folder}/index.js`);
  return fs.readFileSync(script_path, 'utf8');
}

const default_options = {
  debug: true,
  env: {},
  log: (...args: any[]) => {
    console.log(...args);
  },
  progress: (content: string) => {
    console.log(content);
  }
}

describe('plugins', () => {

  it('seniverse', async () => {
    const script = get_plugin_script('seniverse');
    const plugin = createPlugin(script, {
      ...default_options,
      env: {
        SENIVERSE_API_KEY: process.env.SENIVERSE_API_KEY!,
      }
    });
    const result = await plugin.run('search_weather', '{"location": "beijing"}');
    console.log(result);
    expect(result).not.toBeUndefined();
  });

  it('baidu-search', async () => {
    const script = get_plugin_script('baidu-search');
    const plugin = createPlugin(script, {
      ...default_options,
      env: {
        BAIDU_COOKIE: process.env.BAIDU_COOKIE!,
      }
    });
    const result = await plugin.run('search', '{"query": "hello"}');
    console.log(result);
    expect(result).not.toBeUndefined();
  });

  it('DuckDuckGo', async () => {
    const script = get_plugin_script('DuckDuckGo');
    const plugin = createPlugin(script, {
      ...default_options
    });
    const result = await plugin.run('search', '{"query": "hello"}');
    console.log(result);
    expect(result).not.toBeUndefined();
  });

  it('google', async () => {
    const script = get_plugin_script('google');
    const plugin = createPlugin(script, {
      ...default_options,
      env: {
        API_KEY: process.env.GOOGLE_API_KEY!,
        SEARCH_ENGINE_ID: process.env.GOOGLE_SEARCH_ENGINE_ID!,
      }
    });
    const result = await plugin.run('search', '{"query": "hello"}');
    console.log(result);
    expect(result).not.toBeUndefined();
  });

  it('internet', async () => {
    const script = get_plugin_script('internet');
    const plugin = createPlugin(script, {
      ...default_options,
      env: {
        CHROME_BIN: process.env.INTERNET_CHROME_BIN!,
      }
    });
    const result: string = await plugin.run('access_internet', '{"url": "https://www.google.com"}');
    console.log(result);
    expect(result).not.toBe('"Failed to access the page"')
  }, 10000);

  it('ipinfo.io', async () => {
    const script = get_plugin_script('ipinfo.io');
    const plugin = createPlugin(script, {
      ...default_options
    });
    const result: string = await plugin.run('search_ip', '{"ip": "1.1.1.1"}');
    console.log(result);
    expect(result).not.toBeUndefined();
  });

  it('newsdata.io', async () => {
    const script = get_plugin_script('newsdata.io');
    const plugin = createPlugin(script, {
      ...default_options,
      env: {
        API_KEY: process.env.NEWSDATA_API_KEY!,
      }
    });
    const result: string = await plugin.run('search_latest_news', '{"q": "openai"}');
    console.log(result);
    expect(result).not.toBeUndefined();
  });

  it('themoviedb', async () => {
    const script = get_plugin_script('themoviedb');
    const plugin = createPlugin(script, {
      ...default_options,
      env: {
        TMDB_API_KEY: process.env.TMDB_API_KEY!,
      }
    });
    const result: string = await plugin.run('search_movies', '{"query": "Spider-Man"}');
    console.log(result);
    expect(result).not.toBeUndefined();
  })
});
