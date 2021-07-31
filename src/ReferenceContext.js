/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { useBibleReference } from 'bible-reference-rcl';
import React, { useState, createContext } from 'react';

export const ReferenceContext = createContext();

export function ReferenceContextProvider({ children }) {
  const initialBook = 'tit';
  const initialChapter = '1';
  const initialVerse = '1';

  const [referenceBlock, setReferenceBlock] = useState({});

  const [bookmarksVerses, setBookmarksVerses] = useState([]);

  const {
    state: { chapter, verse, bookList, chapterList, verseList, bookName, bookId },
    actions: {
      onChangeBook,
      onChangeChapter,
      onChangeVerse,
      applyBooksFilter,
      goToBookChapterVerse,
      goToNextChapter,
      goToPrevChapter,
      goToNextBook,
      goToNextVerse,
      goToPrevVerse,
      goToPrevBook,
    },
  } = useBibleReference({
    initialBook,
    initialChapter,
    initialVerse,
  });

  const value = {
    state: {
      referenceSelected: { bookId: bookId, chapter: chapter, verse: verse },
      bookList,
      chapterList,
      verseList,
      bookName,
      referenceBlock,
      bookmarksVerses,
    },
    actions: {
      goToBookChapterVerse,
      goToNextChapter,
      goToPrevChapter,
      onChangeBook,
      goToNextBook,
      goToNextVerse,
      goToPrevVerse,
      goToPrevBook,
      onChangeChapter,
      onChangeVerse,
      applyBooksFilter,
      setReferenceBlock,
      setBookmarksVerses,
    },
  };

  return <ReferenceContext.Provider value={value}>{children}</ReferenceContext.Provider>;
}
