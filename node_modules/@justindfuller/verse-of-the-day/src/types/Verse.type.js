export type Book = {
  bookName: string;
  bookAbbr: string;
  bookID: string;
  copyright: string;
  theme: string;
  bibleID: string;
}

export type Chapter = Book & {
  chapterID: string;
  chapter: string;
}

export type FullChapter = Chapter & {
  fullText: string;
}

export type Verse = FullChapter & {
  verse: string;
  reference: string;
  text: string;
}

export type ThemedVerse = Verse & {
  theme: string;
  title: string;
}
