const baseKey = 'DailyVerse';

type ObjectOfStrings = {
  [key: string]: string;
};

function getCacheKey(props: ObjectOfStrings = {}): ObjectOfStrings {
  return {
    book: `${baseKey}:EntireBook:${props.bibleID}`,
    bookIndex: `${baseKey}:RandomBookIndex`,
    chapter: `${baseKey}:Book:${props.theme}`,
    fullChapter: `${baseKey}:Fullchapter:${props.bookAbbr}:${props.chapter}:${props.version}`,
    verse: `${baseKey}:Verse:${props.identifier}`,
  };
}

export default getCacheKey;
