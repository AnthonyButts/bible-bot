import { get } from 'lodash';
import getCacheKey from './../../cacheKeys';
import endpoint from './../../endpoints';
import normalizeText from './../../../utility/text/text';
import fetchFromApi from './../../../utility/fetch/fetch';
import getRandomNumber from './../../../utility/math/math';
import defaultCache from './../../../utility/cache';
import type { Verse, FullChapter } from './../../../types/Verse.type';

function verse(cache: typeof defaultCache = defaultCache): * {
  const {
    getHash,
    setHash,
  } = cache();

  async function setVerseNumber(original: number, cacheKey: string, size: number): Promise<number> {
    let newVerseNumber = original;
    if (!Number.isInteger(newVerseNumber)) {
      newVerseNumber = getRandomNumber(size);
      await setHash(cacheKey, { newVerseNumber });
    }
    return newVerseNumber;
  }

  async function getVerseNumber(cacheKey: string, size: number): Promise<number> {
    let verseNumber = await getHash(cacheKey);
    verseNumber = Number(get(verseNumber, 'newVerseNumber'));
    return setVerseNumber(verseNumber, cacheKey, size);
  }

  async function pickVerse(identifier: string, verseArray) {
    const cacheKey: string = getCacheKey({ identifier }).verse;
    const verseNumber = await getVerseNumber(cacheKey, verseArray.length);
    // default to first verse just in case.
    return verseArray[verseNumber];
  }

  function createVerseData(chapter = {}, randomVerse = {}) {
    return Object.assign({}, chapter, {
      verse: randomVerse.verse,
      reference: randomVerse.reference,
      text: normalizeText(randomVerse.text),
    });
  }

  async function getVerses(chapter) {
    const verses: string = endpoint(chapter).verse;
    const versesResponse = await fetchFromApi(verses);
    return versesResponse.verses;
  }

  async function getRandomVerse(chapter: FullChapter): Promise<Verse> {
    const verseArray: Verse[] = await getRandomVerse.getVerses(chapter);
    const verseObj: Verse = await getRandomVerse.pickVerse(chapter.theme, verseArray);
    return getRandomVerse.createVerseData(chapter, verseObj);
  }

  getRandomVerse.pickVerse = pickVerse;
  getRandomVerse.createVerseData = createVerseData;
  getRandomVerse.getVerseNumber = getVerseNumber;
  getRandomVerse.setVerseNumber = setVerseNumber;
  getRandomVerse.getVerses = getVerses;
  return getRandomVerse;
}

module.exports = verse;
