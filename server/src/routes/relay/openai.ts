import {Router} from "express";
import {getLogger} from "../../utils/logger";
import {openai_models, openai_models_map} from "./openai_models";
import {supplierClientAgent} from "../../ai";
import {Token} from "../../models/Token";
import {CreateEmbeddingRequest, CreateImageRequest} from "openai";
import * as http from "http";
import {CreateChatCompletionRequest, CreateCompletionRequest} from "openai/api";
import OpenAIApiProxy from "../../ai/openai/OpenAIApiProxy";

const router = Router();
const model_router = Router();
const v1_router = Router();
router.use('/v1/models', model_router);
router.use('/v1', v1_router);

const logger = getLogger('routes:relay:openai');

model_router.get('', async (req, res) => {
  res.json({
    object: 'list',
    data: openai_models
  })
});

model_router.get('/:model', async (req, res) => {
  const modelId = req.params.model;
  let model = openai_models_map.get(modelId);
  if (!model) {
    res.status(404).json({
      error: {
        message: `"The model '${modelId}' does not exist"`,
        type: 'invalid_request_error',
        code: 'model_not_found',
        param: 'model'
      }
    });
    return;
  } else {
    res.json(model);
  }
});

v1_router.post('/completions', async (req, res) => {
  const {user_id, api_key_id} = req;
  const model = req.body.model;
  const stream = req.body.stream;
  const [_, openAIApi] = supplierClientAgent.getRandomClient(model, {user_id, api_key_id}) as [Token, OpenAIApiProxy];
  try {
    const request = {...req.body} as CreateCompletionRequest;
    const response = await openAIApi.createCompletion(request,
      {responseType: stream ? 'stream' : 'json'});
    if (stream) {
      // @ts-ignore
      const data = response.data as http.IncomingMessage;
      for (const [key, value] of Object.entries(response.headers)) {
        res.setHeader(key, value);
      }
      data.on('data', (chunk) => {
        res.write(chunk);
      });

      data.on('end', () => {
        res.end();
      });
    } else {
      for (const [key, value] of Object.entries(response.headers)) {
        res.setHeader(key, value);
      }
      res.json(response.data);
    }
  } catch (err) {
    logger.error(err)
    res.status(500).json(ais_error());
  }
});

v1_router.post('/chat/completions', async (req, res) => {
  const {user_id, api_key_id} = req;
  const model = req.body.model;
  const stream = req.body.stream;
  const [_, openAIApi] = supplierClientAgent.getRandomClient(model, {user_id, api_key_id}) as [Token, OpenAIApiProxy];
  try {
    const request = {...req.body} as CreateChatCompletionRequest;
    const response = await openAIApi.createChatCompletion(request,
      {responseType: stream ? 'stream' : 'json'});
    if (stream) {
      // @ts-ignore
      const data = response.data as http.IncomingMessage;
      for (const [key, value] of Object.entries(response.headers)) {
        res.setHeader(key, value);
      }
      data.on('data', (chunk) => {
        res.write(chunk);
      });

      data.on('end', () => {
        res.end();
      });
    } else {
      for (const [key, value] of Object.entries(response.headers)) {
        res.setHeader(key, value);
      }
      res.json(response.data);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(ais_error());
  }
});

v1_router.post('/images/generations', async (req, res) => {
  const {user_id, api_key_id} = req;
  const model = 'dall-e'
  const [_, openAIApi] = supplierClientAgent.getRandomClient(model, {user_id, api_key_id}) as [Token, OpenAIApiProxy];
  try {
    const request = {...req.body} as CreateImageRequest;
    const response = await openAIApi.createImage(request);
    for (const [key, value] of Object.entries(response.headers)) {
      res.setHeader(key, value);
    }
    res.json(response.data);
  } catch (err) {
    logger.error(err);
    res.status(500).json(ais_error());
  }
});

v1_router.post('/embeddings', async (req, res) => {
  const {user_id, api_key_id} = req;
  const model = req.body.model;
  const [_, openAIApi] = supplierClientAgent.getRandomClient(model, {user_id, api_key_id}) as [Token, OpenAIApiProxy];
  try {
    const request = {...req.body} as CreateEmbeddingRequest;
    const response = await openAIApi.createEmbedding(request);
    for (const [key, value] of Object.entries(response.headers)) {
      res.setHeader(key, value);
    }
    res.json(response.data);
  } catch (err) {
    logger.error(err);
    res.status(500).json(ais_error());
  }
});

function ais_error(message: string = 'An error occurred') {
  return {error: {message: message, type: 'ais_api_error'}};
}

export default router;
