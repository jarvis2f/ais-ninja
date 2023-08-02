# ais-ninja

[English README](README_en.md)

## 介绍

![intro.gif](doc%2Fintro.gif)

ais-ninja 是一个基于 chatgpt 的 Web 应用程序。它基于 [ChatGpt-Web](https://github.com/79E/ChatGpt-Web).

* 重构了后端代码。
* 多语言支持。
* 支持插件系统。

## 插件列表

> 欢迎贡献你开发的插件，如何开发可以查看 [插件开发文档](#插件开发)。

| 插件名称                                   | 插件介绍              |
|----------------------------------------|-------------------|
| [Baidu Search](plugins%2Fbaidu-search) | 百度搜索              |
| [DuckDuckGo](plugins%2FDuckDuckGo)     | DuckDuckGo 搜索     |
| [Google Search](plugins%2Fgoogle)      | 谷歌搜索              |
| [imdb](plugins%2Fimdb)                 | IMDB电影搜索（API需要付费） |
| [internet](plugins%2Finternet)         | 联网插件              |
| [ipinfo.io](plugins%2Fipinfo.io)       | ip 信息查询           |
| [newsdata.io](plugins%2Fnewsdata.io)   | 新闻查询              |
| [seniverse](plugins%2Fseniverse)       | 天气查询              |
| [themoviedb](plugins%2Fthemoviedb)     | 电影信息查询            |

## 部署

### docker

```shell
docker run -d \
    --name ais-ninja \
    --hostname ais-ninja \
    -p 6789:80    \
    -e PUID=0     \
    -e DATABASE_NAME=ais_ninja     \
    -e DATABASE_PORT=3306     \
    -e DATABASE_HOST=host     \
    -e DATABASE_USER=root     \
    -e DATABASE_PASSWORD=123456     \
    -e DATABASE_SYNC='true'     \
    -e REDIS_URL=redis://${url}:6379/0     \
    jarvis2f/ais-ninja:v1.0.8
```

### docker-compose

1. 创建文件夹 `ais_ninja` 创建 `docker-compose.yml` 文件.

    ```shell
    mkdir ais.ninja && cd ais.ninja
    touch docker-compose.yml
    ```

2. 复制 [docker-compose.yml](./deploy/docker-compose.yml) 到 `docker-compose.yml` 文件中
3. 修改 `docker-compose.yml` 中的环境变量
4. 运行 `docker-compose up -d` 启动服务

运行 `docker logs ais-ninja-app` 查看日志。如果看到如下日志，则说明服务启动成功。首次启动会生成默认管理员帐户和密码。

```shell
[12:47:52.887] INFO (43): Logger initialized: info
[12:47:57.798] INFO (config/43): Config file path: /app/server/config.json
[12:47:58.308] INFO (db/43): Database connected
[12:47:58.822] INFO (db/43): Database synced
[12:47:58.832] INFO (redis/43): Redis connected
[12:47:58.851] WARN (openai/43): No OpenAI tokens provided
[12:47:58.851] INFO (app/43): OpenAI clients initialized
[12:47:58.860] INFO (app/43): Server running on port 5174
[12:47:58.861] INFO (db/43): Administrator initialized: ${administrator account}  ${administrator password}
```

后台地址：`http://localhost:6789/admin`

### 环境变量

> 本项目中的大部分配置项都是通过环境变量来设置的。
>
> 你也可以修改 `config.json` 文件去设置环境变量。
> 然后运行 `docker run -d --name ais-ninja -v /path/to/config.json:/app/server/config.json jarvis2f/ais-ninja:1.0.0`
> 启动服务.

| Environment Variable      | Description                                                               |
|---------------------------|---------------------------------------------------------------------------|
| `DATABASE_NAME`           | 数据库名称                                                                     |
| `DATABASE_PORT`           | 数据库端口                                                                     |
| `DATABASE_HOST`           | 数据库地址                                                                     |
| `DATABASE_USER`           | 数据库用户名                                                                    |
| `DATABASE_PASSWORD`       | 数据库密码                                                                     |
| `DATABASE_SYNC`           | 项目启动是否自动同步数据库表结构。 true or false                                           |
| `REDIS_URL`               | Redis 地址，格式: redis[s]://[[username][:password]@][host][:port][/db-number] |
| `EMAIL_ENABLE`            | 启用邮箱登录注册 true or false                                                    |
| `EMAIL_HOST`              | 邮箱服务地址                                                                    |
| `EMAIL_PORT`              | 邮箱服务端口                                                                    |
| `EMAIL_FROM`              | 邮箱服务发送方邮箱地址                                                               |
| `EMAIL_AUTH_USER`         | 邮箱服务用户名                                                                   |
| `EMAIL_AUTH_PASS`         | 邮箱服务密码                                                                    |
| `SOCIAL_GOOGLE_CLIENT_ID` | 谷歌登录的client_id                                                            |
| `ALI_ACCESS_KEY_ID`       | 阿里云 accessKeyId                                                           |
| `ALI_ACCESS_KEY_SECRET`   | 阿里云 accessKeySecret                                                       |
| `ALI_SMS_ENABLE`          | 启用手机登录注册 true or false                                                    |
| `ALI_SMS_SIGN_NAME`       | 阿里云短信验证码服务签名                                                              |
| `ALI_SMS_TEMPLATE_CODE`   | 阿里云验证码短信模板，需要包含 {code}                                                    |

## 插件开发

项目启动之后可以到后台 -> 系统配置中填写仓库地址：`https://github.com/jarvis2f/ais-ninja.git`
导入本仓库 [plugins](./plugins) 下的插件。

### 创建对话插件

可以先看下[ OpenAI 的文档](https://platform.openai.com/docs/guides/gpt/function-calling)。
对话中会将插件中的方法以下方这种格式传递给 ChatGPT 的接口，ChatGPT 会返回需要调用的插件方法名称和参数。

```json
{
  "functions": [
    {
      "name": "search_weather",
      "description": "Query china real time weather information from seniverse.com",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "China Pinyin Location name, e.g. beijing"
          }
        },
        "required": [
          "location"
        ]
      }
    }
  ]
}
```

系统中一个插件可以有多个 function, 用户安装一个插件之后会把插件中的所有 function 传递给 ChatGPT。
插件使用 JavaScript 编写，可以参考 [plugins](./plugins)中的代码。
可以使用的库：

* [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 发起网络请求
* [dayjs](https://day.js.org/) 时间处理
* [lodash](https://lodash.com/) 工具库
* [jsdom](https://github.com/jsdom/jsdom) 操作 DOM
* [puppeteer-core](https://www.npmjs.com/package/puppeteer-core) 模拟浏览器
* ais ais_ninja 提供的一些函数
    * ais.createCompletion 调用 OpenAI 的 Completion API
    * ais.createChatCompletion 调用 OpenAI 的 Chat Completion API
    * ais_progress(content:string) 不需要 require,返回给用户当前方法的调用进度

[plugins](./plugins) 目录格式：

* `plugins/${plugin_name}/index.js` 插件代码
* `plugins/${plugin_name}/desc.md` 插件介绍
* `plugins/${plugin_name}/plugin.json` 插件信息

### 插件变量

可以将一些私有的 key 设为插件变量，这样就不会暴露在代码中。在 plugin.json 中的 variables 字段中定义变量。

```json
{
  "name": "weather",
  "description": "Query china real time weather information from seniverse.com",
  "variables": {
    "SENIVERSE_KEY": "Your API Key"
  }
}
```

在前台插件编辑中编写变量保存，然后就可以在代码中使用 `process.env.SENIVERSE_KEY` 获取变量。

### 查看插件日志

可以使用 `console.log` 打印日志。在插件页面中打开调试按钮，会将日志输出到浏览器的 console 中。

```
📣📣📣function_call - [心知天气](search_weather)(ae9bc196-4bfe-43a9-8060-2d2e2ec601c5)
{
    "name": "10000__search_weather",
    "arguments": "{\n\"location\": \"shanghai\"\n}"
}
📣📣📣function_response - []()(ae9bc196-4bfe-43a9-8060-2d2e2ec601c5)
{
    "status": "The API key is invalid.",
    "status_code": "AP010003"
}
```

## 更新记录

### v1.0.8

数据库变更：[v1.0.8.sql](deploy%2Fsql%2Fv1.0.8.sql)

* 禁用 OpenAI token 使用量的额度查询
* 易支付回调问题修改
* 其它一些问题修复

### v1.0.6

数据库变更：[v1.0.6.sql](deploy%2Fsql%2Fv1.0.6.sql)

* 支持 OpenAI、anthropic、stability API代理
* 聊天、绘图精准控制积分扣除
* 增加 stability 绘图模型支持
* 会员等级变更
* 网站标题、logo设置，UI样式变更，更加花里胡哨 🤣

### v1.0.4

数据库变更：[v1.0.4.sql](deploy%2Fsql%2Fv1.0.4.sql)

* 增加 claude 模型支持
* 增加用户邀请码
