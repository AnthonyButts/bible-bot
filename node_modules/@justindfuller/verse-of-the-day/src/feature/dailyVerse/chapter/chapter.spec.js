import test from 'ava';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

test('getRandomChapter returns the cached chapter if available.', async (t) => {
  const fetch = sinon.stub();
  fetch.returns({ chapters: [{ chapter: 'ChapterText', id: 'chapterIDText' }] });
  const chapter = proxyquire('./chapter', {
    './../../../utility/fetch/fetch': fetch,
  });
  const cacheMethods = {
    getHash: sinon.stub(),
    setHash: sinon.stub(),
  };
  cacheMethods.getHash.returns(0);
  const cache = () => cacheMethods;
  const { getRandomChapter } = chapter(cache);
  const res = await getRandomChapter('identifier', {});
  t.is(res.chapter, 'ChapterText');
});

test.skip('getFullChapter returns the cached text if available.', async (t) => {
  const chapter = proxyquire('./chapter', {});
  const cacheMethods = {
    getHash: sinon.stub(),
  };
  cacheMethods.getHash.returns('Cached Data');
  const cache = () => cacheMethods;
  const { getFullChapter } = chapter(cache);
  const res = await getFullChapter({});
  t.is(res, 'Cached Data');
});

test.skip('getRandomChapter returns data from fetch.', async (t) => {
  const fetch = sinon.stub();
  fetch.returns({ chapters: [{ chapter: 'ChapterText', id: 'chapterIDText' }] });
  const getRandomNumber = sinon.stub();
  getRandomNumber.returns(0);
  const chapter = proxyquire('./chapter', {
    './../../../utility/fetch/fetch': fetch,
    './../../../utility/math/math': getRandomNumber,
  });
  const cacheMethods = {
    getHash: sinon.stub(),
    setHash: sinon.stub(),
  };
  const cache = () => cacheMethods;
  const { getRandomChapter } = chapter(cache);
  const res = await getRandomChapter('identifier', {});
  t.is(res.chapter, 'ChapterText');
  t.is(res.chapterID, 'chapterIDText');
  t.true(cacheMethods.setHash.called);
  t.true(cacheMethods.getHash.called);
});

test.skip('getFullChapter returns data from fetch.', async (t) => {
  const fetch = sinon.stub();
  fetch.returns({ search: { result: { passages: [{ text: 'FullChapterText' }] } } });
  const getRandomNumber = sinon.stub();
  getRandomNumber.returns(0);
  const chapter = proxyquire('./chapter', {
    './../../../utility/fetch/fetch': fetch,
  });
  const cacheMethods = {
    getHash: sinon.stub(),
    setHash: sinon.stub(),
  };
  const cache = () => cacheMethods;
  const { getFullChapter } = chapter(cache);
  const res = await getFullChapter({});
  t.is(res.fullText, 'FullChapterText');
  t.true(cacheMethods.setHash.called);
  t.true(cacheMethods.getHash.called);
});
