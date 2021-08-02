import { useBibleReference } from 'bible-reference-rcl';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useState, createContext, useEffect } from 'react';

import { defaultBibleReference, languages } from './config/base';

export const ReferenceContext = createContext();

const _currentLanguage = localStorage.getItem('i18nextLng')
  ? localStorage.getItem('i18nextLng')
  : languages[0];

let _reference = localStorage.getItem('reference')
  ? JSON.parse(localStorage.getItem('reference'))
  : defaultBibleReference[_currentLanguage];

export function ReferenceContextProvider({ children }) {
  let history = useHistory();
  let location = useLocation();
  const currentLocation = location.pathname.split('/');

  const locationReference = {
    bookId: currentLocation[1] ? currentLocation[1] : _reference.bookId,
    chapter: currentLocation[2] ?? _reference.chapter,
    verse: currentLocation[3] ?? _reference.verse ?? 1,
  };

  const initialBook = locationReference.bookId;
  const initialChapter = String(locationReference.chapter);
  const initialVerse = String(locationReference.verse);

  const [referenceBlock, setReferenceBlock] = useState({});

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

  useEffect(() => {
    if (history.location.pathname !== '/' + bookId + '/' + chapter + '/' + verse) {
      history.push('/' + bookId + '/' + chapter + '/' + verse);
      localStorage.setItem(
        'reference',
        JSON.stringify({
          bookId: bookId,
          chapter: chapter,
          verse: verse,
        })
      );
      goToBookChapterVerse(bookId, chapter, verse);
    }
  });

  const value = {
    state: {
      referenceSelected: { bookId: bookId, chapter: chapter, verse: verse },
      bookList,
      chapterList,
      verseList,
      bookName,
      referenceBlock,
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
    },
  };

  return <ReferenceContext.Provider value={value}>{children}</ReferenceContext.Provider>;
}
