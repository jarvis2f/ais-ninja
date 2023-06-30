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
    baseOptions: {
      url: token.host,
    }
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
    label: 'GPT-3.5',
    value: 'gpt-3.5-turbo'
  },
  {
    label: 'GPT-3.5-0613',
    value: 'gpt-3.5-turbo-0613'
  },
  {
    label: 'GPT-4',
    value: 'gpt-4'
  },
  {
    label: 'GPT-4-0314',
    value: 'gpt-4-0314'
  },
  {
    label: 'GPT-4-32k',
    value: 'gpt-4-32k'
  },
  {
    label: 'TEXT-002',
    value: 'text-davinci-002'
  },
  {
    label: 'TEXT-003',
    value: 'text-davinci-003'
  },
  {
    label: 'CODE-002',
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
