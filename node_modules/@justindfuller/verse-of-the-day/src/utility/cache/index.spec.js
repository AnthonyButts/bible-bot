import test from 'ava';
import sinon from 'sinon';
import index from './index';

test('Calls expire with roughly midnight time', async (t) => {
  const expireAsync = sinon.stub();
  const HMSETAsync = sinon.stub();
  HMSETAsync.onCall(0).returns(true);
  const client = {
    expireAsync,
    HMSETAsync,
  };
  await index(client).setHash('TestKey', 'FakeValue');
  t.true(expireAsync.calledWith('TestKey'));
});

test('Does not call expire on failure', async (t) => {
  const expireAsync = sinon.stub();
  const HMSETAsync = sinon.stub();
  HMSETAsync.onCall(0).returns(false);
  const client = {
    expireAsync,
    HMSETAsync,
  };
  await index(client).setHash('TestKey', 'FakeValue');
  t.false(expireAsync.called);
});

test('getHash wraps getall', async (t) => {
  const client = {
    hgetallAsync: sinon.stub(),
  };
  client.hgetallAsync.onCall(0).returns('Test return value');
  client.hgetallAsync.onCall(1).returns('Test return value 1');
  const getHash = await index(client).getHash('Test');
  t.is(getHash, 'Test return value');
  const get = await index(client).get('Test');
  t.is(get, 'Test return value 1');
});

test('Set wraps setHash', async (t) => {
  const client = {
    HMSETAsync: sinon.spy(),
  };
  await index(client).set('BibleID', 'key', 'value');
  t.true(client.HMSETAsync.calledWith('BibleID:key', 'value'));
});

test('Get wraps getHash', async (t) => {
  const client = {
    hgetallAsync: sinon.spy(),
  };
  await index(client).get('BibleID', 'key');
  t.true(client.hgetallAsync.calledWith('BibleID:key'));
});
