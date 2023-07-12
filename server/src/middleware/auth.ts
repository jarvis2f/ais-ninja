import { Request, Response, NextFunction } from 'express';
import ApiResponse from "../utils/response";
import {redisClient} from "../config/redis";

const verifyPath: string[] = [
  'post:/api/u/login',
  'post:/api/u/login/social',
  'get:/api/u/code/send',
  'get:/api/u/pay/notify',
  'post:/api/u/pay/notify',
  'post:/api/u/stripe/webhook',
  'get:/api/u/config',
  'get:/api/u/code/verify',
];

// User Authentication Middleware
async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { token } = req.headers;
  const { path, method } = req;

  const filter = verifyPath.filter((router) => router.toUpperCase() === `${method}:${path}`.toUpperCase());

  if (filter.length || path.indexOf('/api') === -1 || path.startsWith('/v1')) {
    await next();
    return;
  }

  const redisTokenKey = `token:${token}`;
  let tokenInfo: any = (await redisClient!.get(redisTokenKey)) || null;

  if (tokenInfo) {
    try {
      tokenInfo = JSON.parse(tokenInfo);
    } catch (e) {
      await redisClient!.del(redisTokenKey);
      res.status(401).json(ApiResponse.error(401, 'Unauthorized'));
      return;
    }
  } else {
    res.status(401).json(ApiResponse.error(401, 'Unauthorized'));
    return;
  }

  if (path.indexOf('/api/admin') !== -1 && tokenInfo?.role !== 'administrator') {
    res.status(403).json(ApiResponse.error(403, 'Forbidden'));
    return;
  }

  req.user_id = tokenInfo?.id;
  next();
}

export default auth;
