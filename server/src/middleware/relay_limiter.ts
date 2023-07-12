import rateLimit from 'express-rate-limit'
import RedisStore from "rate-limit-redis";
import {redisClient} from "../config/redis";

function getLimiter() {
  return rateLimit({
    windowMs: 60 * 1000,
    max: 500,
    standardHeaders: false,
    legacyHeaders: false,
    message: {
      error: {message: 'Too many requests, please try again later.', type: 'ais_api_error'}
    },
    store: new RedisStore({
      // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
      sendCommand: (...args: string[]) => redisClient?.sendCommand(args),
    }),
  })
}

export default getLimiter;
