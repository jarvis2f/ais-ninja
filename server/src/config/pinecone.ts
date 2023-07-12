import {PineconeClient} from "@pinecone-database/pinecone";
import {getLogger} from "../utils/logger";
import {config} from "./config";
import {supplierClientAgent} from "../ai";
import {OpenAIApi} from "openai";
import {Token} from "../models/Token";
import {randomUUID} from "crypto";
import {ScoredVector} from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/models/ScoredVector";
import {IndexMeta} from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/models";
import {Caller} from "../ai/types";
import OpenAIApiProxy from "../ai/openai/OpenAIApiProxy";

const logger = getLogger("pinecone");
let pinecone: PineconeClient;
let indexName: string;

function init() {
  if (pinecone) return;
  const environment = config?.getConfigValue("PINECONE_ENVIRONMENT") || "sandbox";
  indexName = config?.getConfigValue("PINECONE_INDEX_NAME") || "ais-ninja";
  const apiKey = config?.getConfigValue("PINECONE_API_KEY");
  if (!apiKey) {
    logger.warn("No pinecone api key provided");
    return;
  }
  pinecone = new PineconeClient();
  pinecone.init({
    environment: environment,
    apiKey: apiKey,
  }).then(() => {
    logger.info("Pinecone client initialized");
    createIndex(indexName).then(() => {
      logger.info(`Pinecone index ${indexName} created`);
    });
  }).catch((err) => {
    logger.error("Pinecone client initialization failed", err);
  });
}

function getClient(): PineconeClient {
  if (!pinecone) {
    throw new Error(`No pinecone client found`);
  }
  return pinecone;
}

async function createIndex(index: string) {
  let client = getClient();
  const indexes = await client.listIndexes();
  if (indexes.includes(index)) {
    logger.debug(`Pinecone index ${index} already exists`);
    return;
  }
  await client.createIndex({
    createRequest: {
      name: index,
      dimension: 1536,
      metric: 'cosine',
      podType: 'p1'
    }
  });

  // Loop to check whether the index is created successfully
  let indexMeta: IndexMeta | undefined;
  while (!indexMeta || indexMeta.status?.ready !== true) {
    indexMeta = await client.describeIndex({indexName: index});
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function addIndex(text: string, namespace: string, caller: Caller, metadata?: any): Promise<string> {
  let client = getClient();
  let [_, openAIApi] = supplierClientAgent.getRandomClient("text-embedding-ada-002", caller) as [Token, OpenAIApiProxy];
  let response = await openAIApi.createEmbedding({
    model: 'text-embedding-ada-002',
    input: text
  });
  let index = client.Index(indexName);
  let id = randomUUID();
  let upsert = await index.upsert({
    upsertRequest: {
      vectors: [{
        id: id,
        values: response.data.data[0].embedding,
        metadata: metadata
      }],
      namespace: namespace
    }
  });
  logger.debug(`Pinecone index upsert: ${upsert.upsertedCount}`);
  return id;
}

async function searchIndex(text: string, namespace: string, k: number = 1, caller: Caller, filter?: any, id?: string): Promise<Array<ScoredVector> | undefined> {
  let client = getClient();
  let [_, openAIApi] = supplierClientAgent.getRandomClient("text-embedding-ada-002", caller) as [Token, OpenAIApiProxy];
  let response = await openAIApi.createEmbedding({
    model: 'text-embedding-ada-002',
    input: text
  });
  let index = client.Index(indexName);
  let search = await index.query({
    queryRequest: {
      namespace: namespace,
      topK: k,
      vector: response.data.data[0].embedding,
      filter: filter,
      id: id
    }
  });
  logger.debug(`Pinecone index search: ${search?.matches?.length}`);
  return search?.matches;
}

export default {
  init,
  getClient,
  addIndex,
  searchIndex,
}
