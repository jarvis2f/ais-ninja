import {createClient} from 'redis';
import {RedisClientType} from "@redis/client/dist/lib/client";
import {config} from "./config";
import {getLogger} from "../utils/logger";

const logger = getLogger('redis');

export let redisClient: RedisClientType | undefined;

export async function initRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: config?.getConfigValue('redis.url') as string
    })

    redisClient.on('error', (err) => {
      logger.error("Redis Error:" + err);
    });

    await redisClient.connect();
    logger.info('Redis connected');
  }
}
