import test from 'ava';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import defaultVerse from './verse';
import normalizeText from './../../../utility/text/text';

function getMocks() {
  const mocks = {
    getRandomNumber: sinon.stub(),
    setHash: sinon.spy(),
    getHash: sinon.stub(),
    cache: sinon.stub(),
    fetch: sinon.stub(),
  };
  mocks.cache.returns({ setHash: mocks.setHash, getHash: mocks.getHash });
  const verse = proxyquire('./verse', {
    './../../../utility/math/math': mocks.getRandomNumber,
    './../../../utility/fetch/fetch': mocks.fetch,
  });
  mocks.verse = verse(mocks.cache);
  return mocks;
}

test('If verse number is not a number it sets a new number.', async (t) => {
  const mocks = getMocks();
  mocks.getRandomNumber.returns(1);
  await mocks.verse.setVerseNumber(null, 'TestCacheKey', 6);
  t.true(mocks.cache.called);
  t.true(mocks.getRandomNumber.calledWith(6));
  t.true(mocks.setHash.called);
  const setHashArgs = mocks.setHash.getCall(0).args;
  t.is(setHashArgs[0], 'TestCacheKey');
  t.is(setHashArgs[1].newVerseNumber, 1);
});

test("It returns the verse number when it's already set", async (t) => {
  const mocks = getMocks();
  const res = await mocks.verse.setVerseNumber(7);
  t.true(mocks.cache.called);
  t.false(mocks.getRandomNumber.called);
  t.false(mocks.setHash.called);
  t.is(res, 7);
});

test('It does not throw any errors using the default cache.', (t) => {
  t.notThrows(defaultVerse);
});

test('GetVerseNumber returns the key from cache', async (t) => {
  const mocks = getMocks();
  mocks.getHash.returns({ newVerseNumber: 5 });
  const res = await mocks.verse.getVerseNumber();
  t.is(res, 5);
});

test('pickVerse gets a random verse from the array', async (t) => {
  const mocks = getMocks();
  mocks.getHash.returns({ newVerseNumber: 2 });
  const array = ['zero', 'one', 'two'];
  const res = await mocks.verse.pickVerse('identifier', array);
  t.is(res, array[2]);
});

test('createVerseData combines chapter with new data', (t) => {
  const mocks = getMocks();
  const chapter = { test: 'teststring' };
  const randomVerse = {
    verse: 'versetext',
    reference: 'referencetext',
    text: 'normalizedtext',
  };
  const res = mocks.verse.createVerseData(chapter, randomVerse);
  t.is(res.test, chapter.test);
  t.is(res.verse, randomVerse.verse);
  t.is(res.reference, randomVerse.reference);
  t.is(res.text, normalizeText(randomVerse.text));
});

test('getVerses fetches data from the API', async (t) => {
  const mocks = getMocks();
  const chapter = { chapterID: 'chapterIDTest' };
  mocks.fetch.returns({ verses: 'TestVerses' });
  const res = await mocks.verse.getVerses(chapter);
  t.is(res, 'TestVerses');
});
