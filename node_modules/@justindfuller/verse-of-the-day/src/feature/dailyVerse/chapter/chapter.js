import { get } from 'lodash';
import getCacheKey from './../../cacheKeys';
import endpoint from './../../endpoints';
import getRandomNumber from './../../../utility/math/math';
import fetchFromApi from './../../../utility/fetch/fetch';
import defaultCache from './../../../utility/cache';
import type { Chapter, Book, FullChapter } from './../../../types/Verse.type';

function chapter(cache: typeof defaultCache = defaultCache): * {
  const {
    getHash,
    setHash,
  } = cache();

  async function getRandomChapter(props: Book): Promise<Chapter> {
    const chapterURL = endpoint(props).chapter;
    const cacheKey = getCacheKey(props).chapter;
    const res = await fetchFromApi(chapterURL);
    const chapters = res.chapters;
    const stored = await getHash(cacheKey);
    const randomNumber = get(stored, 'randomNumber') || getRandomNumber(chapters.length - 1);
    const randomChapter = get(chapters, `[${randomNumber}]`, {});
    const data = Object.assign({}, props, {
      chapter: randomChapter.chapter,
      chapterID: randomChapter.id,
    });
    setHash(cacheKey, { randomNumber });
    return data;
  }

  async function getFullChapter(book: Chapter): Promise<FullChapter> {
    const props = Object.assign({}, book, { version: book.bibleID });
    const url = endpoint(props).fullChapter;
    const res = await fetchFromApi(url);
    const data: FullChapter = Object.assign({}, book, {
      fullText: get(res, 'search.result.passages[0].text'),
    });
    return data;
  }

  return {
    getRandomChapter,
    getFullChapter,
  };
}

module.exports = chapter;
