import { get } from 'lodash';
import cacheKeys from './../../cacheKeys';
import endpoint from './../../endpoints';
import fetchFromApi from './../../../utility/fetch/fetch';
import getRandomInt from './../../../utility/math/math';
import cache from './../../../utility/cache';
import type { Book } from './../../../types/Verse.type';

const {
  getHash,
  setHash,
} = cache();

type BookResponse = {
  name: string,
  abbr: string,
  id: string,
  copyright: string,
};

type Props = {
  theme: string;
  title: string;
  bookName: string;
  bibleID: string;
};

function createData(props, book: BookResponse): * {
  return Object.assign({}, props, {
    bookName: get(book, 'name'),
    bookAbbr: get(book, 'abbr'),
    bookID: get(book, 'id'),
    copyright: get(book, 'copyright'),
  });
}

function getBookByName(bookArray: BookResponse[], bookName: string): BookResponse {
  const filterBooks = ({ name }) => name.toLowerCase().indexOf(bookName.toLowerCase()) > -1;
  return bookArray.filter(filterBooks)[0];
}

async function getRandomIndex(bookArray: BookResponse[]): Promise<number> {
  const cacheKey = cacheKeys().bookIndex;
  let bookIndex = await getHash(cacheKey);
  bookIndex = Number(get(bookIndex, 'bookIndex'));

  if (!Number.isInteger(bookIndex)) {
    bookIndex = getRandomInt(bookArray.length);
    await setHash(cacheKey, { bookIndex });
  }

  return bookIndex;
}

async function getRandomBook(bookArray: BookResponse[]): Promise<BookResponse> {
  const bookIndex: number = await getRandomIndex(bookArray);
  return bookArray[bookIndex];
}

async function getBook(props: Props): Promise<Book> {
  const url: string = endpoint(props).books;
  const res = await fetchFromApi(url);
  const applicator = props.bookName === 'random' ? getRandomBook : getBookByName;
  const book: BookResponse = await applicator(res.books, props.bookName);
  return createData(props, book);
}

module.exports = getBook;
