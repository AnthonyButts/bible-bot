import test from 'ava';
import proxyquire from 'proxyquire';

test.skip('It creates the data object', (t) => {
  const Book = proxyquire('./books', {});
  const data = {
    name: 'Name',
    abbr: 'Abbr',
    id: 'ID',
    copyright: 'copyright',
  };
  const res = Book.createData(data);
  t.is(res.bookName, data.name);
  t.is(res.bookAbbr, data.abbr);
  t.is(res.bookID, data.id);
  t.is(res.copyright, data.copyright);
});

function getBookName(t, array, name, expected) {
  const Book = proxyquire('./books', {});
  const found = Book.getBookByName(array, name);
  t.is(found, array[expected]);
}

const array = [{ name: 'Proverbs' }, { name: 'Psalms' }, { name: '1 Samuel' }];
test.skip('It gets the book by name', getBookName, array, 'proverb', 0);
test.skip('It gets the book by name', getBookName, array, 'psalm', 1);
test.skip('It gets the book by name', getBookName, array, 'samuel', 2);
