# ais-ninja

## Introduction

ais-ninja is a chatgpt based web application. It is based on the [ChatGpt-Web](https://github.com/79E/ChatGpt-Web).

* Refactored the server code.
* Support multiple languages.
* Support plug-in system like OpenAI GPT-4.

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
    -e DATABASE_SYNC=true     \
    -e REDIS_URL=redis://${url}:6379/0     \
    -e EMAIL_HOST=smtp.office365.com     \
    -e EMAIL_PORT=587     \
    -e EMAIL_FROM=     \
    -e EMAIL_AUTH_USER=     \
    -e EMAIL_AUTH_PASS=     \
    -e SOCIAL_GOOGLE_CLIENT_ID=     \
    -e VITE_APP_REQUEST_HOST=     \
    jarvis2f/ais-ninja:1.0.0
```

### docker-compose

1. Create folder `ais_ninja` and create file `docker-compose.yml` in it.

    ```shell
    mkdir ais.ninja && cd ais.ninja
    touch docker-compose.yml
    ```

2. Copy [docker-compose.yml](.%2Fdeploy%2Fdocker-compose.yml) to `docker-compose.yml` file.
3. Modify the environment variables in the `docker-compose.yml` file.
4. Run `docker-compose up -d` to start the service.


Run `docker logs ais-ninja-app` to view the log.If you see the following log, it means that the service is started successfully. First time start will generate a default administrator account.

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

### Environment Variable

> Most configuration items in this project are set through environment variables.
>
> You can also modify the `config.json` file to set the environment variables. Then run `docker run -d --name ais-ninja -v /path/to/config.json:/app/server/config.json jarvis2f/ais-ninja:1.0.0` to start the service.

| Environment Variable      | Description                                                                    |
|---------------------------|--------------------------------------------------------------------------------|
| `VITE_APP_REQUEST_HOST`   | Request the `Host` address of the server.                                      |
| `VITE_APP_TITLE`          | Chat Web title.                                                                |
| `VITE_APP_LOGO`           | Chat Web Logo。                                                                 |
| `DATABASE_NAME`           | Database name.                                                                 |
| `DATABASE_PORT`           | Database port.                                                                 |
| `DATABASE_HOST`           | Database host.                                                                 |
| `DATABASE_USER`           | Database user.                                                                 |
| `DATABASE_PASSWORD`       | Database password.                                                             |
| `DATABASE_SYNC`           | Automatically synchronize model to database. true or false                     |
| `REDIS_URL`               | Redis url.format: redis[s]://[[username][:password]@][host][:port][/db-number] |
| `EMAIL_HOST`              | Email host.                                                                    |
| `EMAIL_PORT`              | Email port.                                                                    |
| `EMAIL_FROM`              | Email from.                                                                    |
| `EMAIL_AUTH_USER`         | Email auth user.                                                               |
| `EMAIL_AUTH_PASS`         | Email auth pass.                                                               |
| `SOCIAL_GOOGLE_CLIENT_ID` | Google client id.                                                              |

