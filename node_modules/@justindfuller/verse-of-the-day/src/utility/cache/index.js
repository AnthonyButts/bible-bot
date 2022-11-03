import _ from 'lodash';
import defaultClient from './client';

function cache(client = defaultClient) {
  const redisClient = _.isFunction(client) ? client() : client;

  function getSecondsUntilMidnight() {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const seconds = (midnight - Date.now()) / 1000;
    return Number(seconds.toFixed());
  }

  function expireAtMidnight(key) {
    return redisClient.expireAsync(key, getSecondsUntilMidnight());
  }

  async function getHash(key) {
    return redisClient.hgetallAsync(key);
  }

  async function setHash(key, value) {
    const result = await redisClient.HMSETAsync(key, value);

    if (result) {
      expireAtMidnight(key);
    }
  }

  function get(bibleID, key) {
    return getHash(`${bibleID}:${key}`);
  }

  function set(bibleID, key, value) {
    return setHash(`${bibleID}:${key}`, value);
  }

  return {
    get,
    set,
    getHash,
    setHash,
  };
}

export default cache;
