import test from 'ava';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const response = {
  body: '{ "response": "test response" }',
};
const request = sinon.stub().returns(response);
const cacheObj = {
  getHash: sinon.stub(),
  setHash: sinon.stub(),
};
const cache = sinon.stub();
cache.returns(cacheObj);

const fetch = proxyquire('./fetch', {
  'request-promise': request,
  './../cache': cache,
});

test.skip('Fetch calls request with Authorization headers.', (t) => {
  fetch('Test URL');
  const headers = request.getCall(0).args[0].headers;
  t.true(headers.Authorization.indexOf('Basic') > -1);
});

test('It returns the response from the body', async (t) => {
  const res = await fetch('Test URL');
  t.is(res, 'test response');
});

test('It throws an error if response is invalid', async (t) => {
  const invalid = sinon.stub().returns('');
  const fetchError = proxyquire('./fetch', {
    'request-promise': invalid,
  });
  try {
    await fetchError();
  } catch (e) {
    t.is(e.message, 'An error occured while retrieving the verse data.');
  }
});
