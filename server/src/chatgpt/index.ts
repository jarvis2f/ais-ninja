import {Configuration, OpenAIApi} from "openai";
import {Token} from "../models/Token";
import {getLogger} from "../utils/logger";

const logger = getLogger("openai");
const openAIClients = new Map<number, [Token, OpenAIApi]>();

async function initClients() {
  let tokens = await Token.findAll({
    where: {
      status: 1
    },
    raw: true
  });
  if (tokens.length === 0) {
    logger.warn("No OpenAI tokens provided");
    return;
  }
  tokens.forEach((token) => {
    putClient(token);
  });
}

function putClient(token: Token) {
  const configuration = new Configuration({
    apiKey: token.key,
    basePath: `${token.host}/v1`,
  });
  const openai = new OpenAIApi(configuration);
  openAIClients.set(token.id, [token, openai]);
}

function removeClient(tokenId: number) {
  openAIClients.delete(tokenId);
}

function getClient(tokenId: number): [Token, OpenAIApi] {
  if (!openAIClients.has(tokenId)) {
    throw new Error(`No OpenAI client found for token ${tokenId}`);
  }
  return openAIClients.get(tokenId)!;
}

function getRandomClient(model: string): [Token, OpenAIApi] {
  const clients = Array.from(openAIClients.values());
  const client = clients.filter((value: [Token, OpenAIApi]) => {
    const [token, openai] = value;
    return token.models?.split(",").includes(model);
  }).at(Math.floor(Math.random() * clients.length));
  if (!client) {
    throw new Error(`No OpenAI client found for model ${model}`);
  }
  return client;
}

export const available_models = [
  {
    label: 'gpt-3.5-turbo',
    value: 'gpt-3.5-turbo'
  },
  {
    label: 'gpt-3.5-turbo-16k',
    value: 'gpt-3.5-turbo-16k'
  },
  {
    label: 'gpt-3.5-turbo-0613',
    value: 'gpt-3.5-turbo-0613'
  },
  {
    label: 'gpt-3.5-turbo-16k-0613',
    value: 'gpt-3.5-turbo-16k-0613'
  },
  {
    label: 'gpt-4',
    value: 'gpt-4'
  },
  {
    label: 'gpt-4-0613',
    value: 'gpt-4-0613'
  },
  {
    label: 'gpt-4-32k-0613',
    value: 'gpt-4-32k-0613'
  },
  {
    label: 'gpt-4-32k',
    value: 'gpt-4-32k'
  },
  {
    label: 'text-davinci-003',
    value: 'text-davinci-003'
  },
  {
    label: 'text-davinci-002',
    value: 'text-davinci-002'
  },
  {
    label: 'code-davinci-002',
    value: 'code-davinci-002'
  }
];

export {
  initClients,
  putClient,
  removeClient,
  getClient,
  getRandomClient,
}
