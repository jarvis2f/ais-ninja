import {Router} from "express";
import {getLogger} from "../../utils/logger";
import {supplierClientAgent} from "../../ai";
import Anthropic from "@anthropic-ai/sdk";
import {Token} from "../../models/Token";
import CompletionCreateParams = Anthropic.CompletionCreateParams;
import {AnthropicProxy} from "../../ai/anthropic/AnthropicProxy";

const router = Router();
const v1_router = Router();
router.use('/v1', v1_router);

const logger = getLogger('routes:relay:anthropic');

v1_router.post('/complete', async (req, res) => {
  const {user_id, api_key_id} = req;
  const model = req.body.model;
  const stream = req.body.stream as boolean;
  const [_, anthropic] = supplierClientAgent.getRandomClient(model, {user_id, api_key_id}) as [Token, AnthropicProxy];
  try {
    const request = {...req.body} as CompletionCreateParams & { stream?: boolean };
    const response = await anthropic.createCompletions(request as any);
    if (stream) {
      // // @ts-ignore
      // const data = response as APIResponse<Completion | Stream<Completion>>;
      // for (const [key, value] of Object.entries(response.headers)) {
      //   res.setHeader(key, value);
      // }
      // let responseData = '';
      // data.on('data', (chunk) => {
      //   responseData += chunk;
      //   res.write(chunk);
      // });
      //
      // data.on('end', () => {
      //   res.end();
      //   charging.chat_completions({user_id, api_key_id}, {request, response: responseData});
      // });
    } else {
      for (const [key, value] of Object.entries(response.responseHeaders)) {
        if (value) {
          res.setHeader(key, value);
        }
      }
      res.json(response);
      // charging.chat_completions({user_id, api_key_id}, {request, response: response.data});
      res.json(response);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json(ais_error());
  }
});

function ais_error(message: string = 'An error occurred') {
  return {error: {message: message, type: 'ais_api_error'}};
}

export default router;
