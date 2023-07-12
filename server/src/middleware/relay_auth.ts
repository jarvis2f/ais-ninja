import {NextFunction, Request, Response} from "express";
import {redisClient} from "../config/redis";
import {UserApiKey} from "../models/UserApiKey";

export async function relay_auth(req: Request, res: Response, next: NextFunction) : Promise<void> {
  //Authorization: Bearer OPENAI_API_KEY
  const { authorization } = req.headers;
  const {path} = req;
  if (!path.startsWith('/v1'))
    return next();
  if (!authorization) {
    res.status(401).json({error: {message: 'Unauthorized', type: 'ais_api_error'}});
    return;
  }

  const sk = authorization.split(' ')[1].trim();
  const apiKey = sk.split('-')[1];
  if (!apiKey || apiKey.length !== 48) {
    res.status(401).json({error: {message: 'Incorrect API key provided', type: 'ais_api_error'}});
    return;
  }

  // get user_id and api_key_id from redis
  const redisKey = `api_key:${apiKey}`;
  const keyInfo = await redisClient!.get(redisKey);
  let userId, apiKeyId;
  if (!keyInfo) {
    const userApiKey = await UserApiKey.findOne({
      where: {
        api_key: apiKey
      },
      raw: true
    });
    if (!userApiKey) {
      res.status(401).json({error: {message: 'Incorrect API key provided', type: 'ais_api_error'}});
      return;
    }
    userId = userApiKey.user_id;
    apiKeyId = userApiKey.id;
    await redisClient!.set(redisKey, `${userApiKey.user_id}:${userApiKey.id}`);
  } else {
    const [uid, aid] = keyInfo.split(':');
    userId = uid;
    apiKeyId = aid;
  }

  req.user_id = Number(userId);
  req.api_key_id = Number(apiKeyId);
  next();
}
