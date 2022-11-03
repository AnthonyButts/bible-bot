import test from 'ava';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

test('It fetches the data', async (t) => {
  const fetchMock = sinon.stub();
  fetchMock.returns({
    versions: [
      {
        id: 'TestID',
        name: 'TestName',
        lang_name: 'TestLang',
      },
    ],
  });
  const getListOfVersions = proxyquire('./versions', {
    './../../utility/fetch/fetch': fetchMock,
  });
  const res = await getListOfVersions();
  t.true(fetchMock.called);
  t.is(res[0].id, 'TestID');
  t.is(res[0].name, 'TestName');
  t.is(res[0].language, 'TestLang');
});
