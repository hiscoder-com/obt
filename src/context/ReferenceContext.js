import React, { useState, createContext, useEffect } from 'react';

import { useBibleReference } from 'bible-reference-rcl';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useChunk from '../hooks/useChunk';
import { defaultBibleReference, defaultOBSReference, languages } from '../config/base';
import { checkLSVal } from '../helper';

export const ReferenceContext = createContext();

const _currentLanguage = checkLSVal('i18nextLng', languages[0]);
const _reference = checkLSVal(
  'reference',
  {
    bible: defaultBibleReference[_currentLanguage],
    obs: defaultOBSReference[_currentLanguage],
  },
  'object',
  'bible'
)['bible'];
const addOBS = true;

export function ReferenceContextProvider({ children }) {
  const { t } = useTranslation();
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

  const [referenceBlock, setReferenceBlock] = useState({
    ...locationReference,
    resource: 'unfoldingword__ult',
    text: t('Default_verse'),
  });

  const {
    state: { chapter, verse, bookList, chapterList, verseList, bookName, bookId },
    actions: {
      onChangeBook,
      onChangeChapter,
      onChangeVerse,
      applyBooksFilter,
      getFilteredBookList,
      getFullBookList,
      goToBookChapterVerse,
      goToNextChapter,
      goToPrevChapter,
      goToNextBook,
      goToNextVerse,
      goToPrevVerse,
      goToPrevBook,
      setNewBookList,
    },
  } = useBibleReference({
    initialBook,
    initialChapter,
    initialVerse,
    addOBS,
  });

  const { chunks } = useChunk(chapter, bookId);

  useEffect(() => {
    if (history.location.pathname !== '/' + bookId + '/' + chapter + '/' + verse) {
      history.push('/' + bookId + '/' + chapter + '/' + verse);
      const oldReference = JSON.parse(localStorage.getItem('reference'));
      const newReference = {
        ...oldReference,
        [bookId === 'obs' ? 'obs' : 'bible']: { bookId, chapter, verse },
      };
      localStorage.setItem('reference', JSON.stringify(newReference));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter, verse]);

  useEffect(() => {
    if (history.location.pathname !== '/' + bookId + '/' + chapter + '/' + verse) {
      const oldReference = JSON.parse(localStorage.getItem('reference'));
      const newReference = {
        ...oldReference,
        [locationReference.bookId === 'obs' ? 'obs' : 'bible']: { ...locationReference },
      };
      localStorage.setItem('reference', JSON.stringify(newReference));
      goToBookChapterVerse(
        locationReference.bookId,
        locationReference.chapter,
        locationReference.verse
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location]);

  const value = {
    state: {
      referenceSelected: { bookId: bookId, chapter: chapter, verse: verse },
      bookList,
      chapterList,
      verseList,
      bookName,
      referenceBlock,
      chunks,
    },
    actions: {
      goToBookChapterVerse,
      goToNextBook,
      goToPrevBook,
      goToNextChapter,
      goToPrevChapter,
      goToNextVerse,
      goToPrevVerse,
      onChangeBook,
      onChangeChapter,
      onChangeVerse,
      applyBooksFilter,
      setReferenceBlock,
      setNewBookList,
      getFilteredBookList,
      getFullBookList,
    },
  };

  return <ReferenceContext.Provider value={value}>{children}</ReferenceContext.Provider>;
}
