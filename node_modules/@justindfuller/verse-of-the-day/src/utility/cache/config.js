import type { Config } from './../../types/Redis.type';
import type { Environment } from './../../types/Environment.type';

function config(environment: Environment = process.env): Config {
  const isProd = environment.NODE_ENV === 'production';

  return {
    retry_strategy(options) {
      if (options.error) {
        console.error('CONNECTION ERROR', options.error);
        return new Error('An error occured while connecting to Redis.');
      }
    },
    host: isProd ? environment.REDISHOST : '127.0.0.1',
    port: isProd ? environment.REDISPORT : '6379',
    password: isProd ? environment.REDISAUTH : undefined,
  };
}

export default config;
