import redis from 'redis';
import bluebird from 'bluebird';
import config from './config';
import {
  $log
} from './../logging';

function handleError(...args: any[]): void {
  $log().error('Redis Error', ...args);
}

let client;

export default () => {
  if (client) {
    return client;
  }
  
  try {
    client = redis.createClient(config());
    client.on('error', handleError);
    client.on('warning', handleError);
    bluebird.promisifyAll(redis.RedisClient.prototype);
    bluebird.promisifyAll(redis.Multi.prototype);
  } catch (e) {
    console.error('Unable to start up redis client.');
  }

  return client;
};