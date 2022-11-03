const baseURL = 'https://bibles.org/v2';

type ObjectOfStrings = {
  [key: string]: string;
};

function endpoint(props: ObjectOfStrings = {}): ObjectOfStrings {
  return {
    books: `${baseURL}/versions/${props.bibleID}/books.js`,
    chapter: `${baseURL}/books/${props.bookID}/chapters.js`,
    fullChapter: `${baseURL}/passages.js?q[]=${props.bookAbbr}+${props.chapter}&version=${props.version}`,
    verse: `${baseURL}/chapters/${props.chapterID}/verses.js`,
    versions: `${baseURL}/versions.js?language=eng-US`,
  };
}

module.exports = endpoint;
