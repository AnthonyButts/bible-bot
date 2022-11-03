import test from 'ava';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import config from './config';

test('Client calls createClient and on error event.', (t) => {
  const redis = {
    createClient: sinon.stub(),
  };
  const client = {
    on: sinon.spy(),
  };
  redis.createClient.onFirstCall().returns(client);
  proxyquire('./client', {
    redis,
  });
  t.true(redis.createClient.calledWith(config()));
  t.true(client.on.called);
});

test('The callback to on error does not throw an error', (t) => {
  const redis = {
    createClient: sinon.stub(),
  };
  const client = {
    on: (event, f) => t.notThrows(f),
  };
  redis.createClient.onFirstCall().returns(client);
  proxyquire('./client', {
    redis,
  });
});
