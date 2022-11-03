import Promise from 'bluebird';
import compose from 'promise-compose';
import book from './books/books';
import verse from './verse/verse';
import chapter from './chapter/chapter';
import client from './../../utility/cache/client';

const views = [
  {
    theme: 'proverb',
    title: 'TODAY\'S PROVERB',
    bookName: 'Proverbs',
  },
  {
    theme: 'psalm',
    title: 'TODAY\'S PSALM',
    bookName: 'Psalm',
  },
  {
    theme: 'random',
    title: 'TODAY\'S VERSE',
    bookName: 'random',
  },
];

const getBook = compose(book, chapter().getRandomChapter, chapter().getFullChapter, verse());

async function getVerseOfTheDay(bibleID = 'eng-ESV') {
  const addBibleID = v => Object.assign({}, v, { bibleID });
  return Promise.all(views.map(addBibleID).map(getBook)).tap(() => client().quit());
}

export { getVerseOfTheDay };
export default getVerseOfTheDay;
