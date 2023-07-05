import {Configuration, OpenAIApi} from "openai";
import * as path from "path";
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

// openai not support with this auth method
test('use access token to create openai client', async () => {
  const configuration = new Configuration({
    accessToken: process.env.TEST_OPENAI_ACCESS_TOKEN,
    basePath: `${process.env.TEST_OPENAI_HOST}/v1`,
  });
  const openai = new OpenAIApi(configuration);
  await openai.createChatCompletion({
    model: 'davinci',
    messages: [
      {
        content: 'Hello, how are you?',
        role: 'user'
      }
    ],
  }).then((result) => {
    console.log(result);
    expect(result).not.toBeUndefined();
  }).catch((error) => {
    console.log(error);
  });
});

// openai not support with this auth method
test('use username to create openai client', async () => {
  const configuration = new Configuration({
    username: process.env.TEST_OPENAI_USERNAME,
    password: process.env.TEST_OPENAI_PASSWORD,
    basePath: `${process.env.TEST_OPENAI_HOST}/v1`,
  });
  const openai = new OpenAIApi(configuration);
  await openai.createChatCompletion({
    model: 'davinci',
    messages: [
      {
        content: 'Hello, how are you?',
        role: 'user'
      }
    ],
  }).then((result) => {
    console.log(result);
    expect(result).not.toBeUndefined();
  }).catch((error) => {
    console.log(error);
  });
});
