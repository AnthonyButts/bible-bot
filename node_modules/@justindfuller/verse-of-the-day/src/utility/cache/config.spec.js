import test from 'ava';
import config from './config';

test('It provides a host', (t) => {
  const configData = config({ NODE_ENV: 'development' });
  t.is(configData.host, '127.0.0.1');
});

test('It provides a port', (t) => {
  const configData = config({ NODE_ENV: 'development' });
  t.is(configData.port, '6379');
});

test('It provides an empty password', (t) => {
  const configData = config({ NODE_ENV: 'development' });
  t.is(configData.password, '');
});

test('It provides a host based off environment variables in production', (t) => {
  const configData = config({ NODE_ENV: 'production', REDISHOST: 'TestHost' });
  t.is(configData.host, 'TestHost');
});

test('It provides a port based off environment variables in production', (t) => {
  const configData = config({ NODE_ENV: 'production', REDISPORT: 'TestPort' });
  t.is(configData.port, 'TestPort');
});

test('It provides a password based off environment variables in production', (t) => {
  const configData = config({ NODE_ENV: 'production', REDISAUTH: 'TestPassword' });
  t.is(configData.password, 'TestPassword');
});
