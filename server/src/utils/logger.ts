import pino from 'pino';

const logger = pino({
  level: process.env.SERVER_LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      errorProps: 'stack',
      errorLikeObjectKeys: ['err', 'error']
    }
  }
});

logger.info('Logger initialized: ' + logger.level);

export function getLogger(name: string, level?: string) {
  return logger.child({name}, {level});
}
