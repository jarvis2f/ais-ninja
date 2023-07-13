# ais-ninja

## Introduction

![intro_en.gif](doc%2Fintro_en.gif)

ais-ninja is a chatgpt based web application. It is based on the [ChatGpt-Web](https://github.com/79E/ChatGpt-Web).

* Refactored the server code.
* Support multiple languages.
* Support plug-in system like OpenAI GPT-4.
* Support claude model。

## Plugin list

> Welcome to contribute the plug-ins you develop. How to develop them can be found
> in [Plugin Development](#chatgpt-plugin-development)。

| plugin name                            | introduction                             |
|----------------------------------------|------------------------------------------|
| [Baidu Search](plugins%2Fbaidu-search) | Baidu search                             |
| [DuckDuckGo](plugins%2FDuckDuckGo)     | DuckDuckGo search                        |
| [Google Search](plugins%2Fgoogle)      | google search                            |
| [imdb](plugins%2Fimdb)                 | IMDB Movie Search (API requires payment) |
| [internet](plugins%2Finternet)         | networking plug-in                       |
| [ipinfo.io](plugins%2Fipinfo.io)       | ip information query                     |
| [newsdata.io](plugins%2Fnewsdata.io)   | news inquiry                             |
| [seniverse](plugins%2Fseniverse)       | weather query                            |
| [themoviedb](plugins%2Fthemoviedb)     | Movie Information Inquiry                |

## How to deploy

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
    -e REDIS_URL=redis://${url}:6379/0  \
    jarvis2f/ais-ninja:1.0.2
```

### docker-compose

1. Create folder `ais_ninja` and create file `docker-compose.yml` in it.

    ```shell
    mkdir ais.ninja && cd ais.ninja
    touch docker-compose.yml
    ```

2. Copy [docker-compose.yml](./deploy/docker-compose.yml) to `docker-compose.yml` file.
3. Modify the environment variables in the `docker-compose.yml` file.
4. Run `docker-compose up -d` to start the service.

Run `docker logs ais-ninja-app` to view the log.If you see the following log, it means that the service is started
successfully. First time start will generate a default administrator account.

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

admin address：`http://localhost:6789/admin`

### Environment Variable

> Most configuration items in this project are set through environment variables.
>
> You can also modify the `config.json` file to set the environment variables. Then
> run `docker run -d --name ais-ninja -v /path/to/config.json:/app/server/config.json jarvis2f/ais-ninja:1.0.0` to start
> the service.

| Environment Variable      | Description                                                                    |
|---------------------------|--------------------------------------------------------------------------------|
| `DATABASE_NAME`           | Database name.                                                                 |
| `DATABASE_PORT`           | Database port.                                                                 |
| `DATABASE_HOST`           | Database host.                                                                 |
| `DATABASE_USER`           | Database user.                                                                 |
| `DATABASE_PASSWORD`       | Database password.                                                             |
| `DATABASE_SYNC`           | Automatically synchronize model to database. true or false                     |
| `REDIS_URL`               | Redis url.format: redis[s]://[[username][:password]@][host][:port][/db-number] |
| `EMAIL_ENABLE`            | Enable email login registration. true or false                                 |
| `EMAIL_HOST`              | Email host.                                                                    |
| `EMAIL_PORT`              | Email port.                                                                    |
| `EMAIL_FROM`              | Email from.                                                                    |
| `EMAIL_AUTH_USER`         | Email auth user.                                                               |
| `EMAIL_AUTH_PASS`         | Email auth pass.                                                               |
| `SOCIAL_GOOGLE_CLIENT_ID` | Google client id.                                                              |
| `ALI_ACCESS_KEY_ID`       | Alibaba Cloud accessKeyId                                                      |
| `ALI_ACCESS_KEY_SECRET`   | Alibaba Cloud accessKeySecret                                                  |
| `ALI_SMS_ENABLE`          | Enable mobile login registration true or false                                 |
| `ALI_SMS_SIGN_NAME`       | Alibaba Cloud SMS Verification Code Service Signature                          |
| `ALI_SMS_TEMPLATE_CODE`   | Alibaba Cloud verification code SMS template, which needs to include {code}    |

## ChatGPT Plugin Development

After the project starts, you can go to the admin -> Fill in the warehouse address in the system
configuration：`https://github.com/jarvis2f/ais-ninja.git` Import the plugins under [plugins](./plugins) in this
warehouse.

### Create a chat plugin

You can first look at OpenAI's[文档](https://platform.openai.com/docs/guides/gpt/function-calling)。
In the dialog, the method in the plugin will be passed to the ChatGPT interface in the following format,
and ChatGPT will return the plugin method name and parameters that need to be called.

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

A plugin in the system can have multiple functions.
After installing a plugin, the user will pass all the functions in the plugin to ChatGPT.
Plugins are written in JavaScript, you can refer to the code in [plugins](./plugins).
Available libraries:

* [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) Make a network request
* [dayjs](https://day.js.org/) time processing
* [lodash](https://lodash.com/) Tool Library
* [jsdom](https://github.com/jsdom/jsdom) manipulating the DOM
* [puppeteer-core](https://www.npmjs.com/package/puppeteer-core) mock browser
* ais Some functions provided by the ais_ninja system
    * ais.createCompletion Call OpenAI's Completion API
    * ais.createChatCompletion Call OpenAI's Chat Completion API
    * ais_progress(content:string) No require required, return to the user the call progress of the current method

[plugins](./plugins) directory format：

* `plugins/${plugin_name}/index.js` plugin code
* `plugins/${plugin_name}/desc.md` plugin introduction
* `plugins/${plugin_name}/plugin.json` plugin information

### Plugin Variables

Some private keys can be set as plugin variables so that they will not be exposed in the code.
Define variables in the variables field in plugin.json.

```json
{
  "name": "weather",
  "description": "Query china real time weather information from seniverse.com",
  "variables": {
    "SENIVERSE_KEY": "Your API Key"
  }
}
```

Write the variable save in the front-end plugin editor, and then you can use `process.env.SENIVERSE_KEY` to get the
variable in the code.

### Plugin Logs

Logs can be printed using `console.log`. Turn on the debug button on the plugin page, and the log will be output to the
console of the browser.

```
📣📣📣function_call - [seniverse](search_weather)(ae9bc196-4bfe-43a9-8060-2d2e2ec601c5)
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

## Changelog

### v1.0.4

database changes：[v1.0.4.sql](deploy%2Fsql%2Fv1.0.4.sql)

* Add claude model support
* Add User Invitation Code
