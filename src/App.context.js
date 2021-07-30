import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { ResourcesContextProvider } from 'scripture-resources-rcl';
import { useBibleReference } from 'bible-reference-rcl';
import { useTranslation } from 'react-i18next';

import { getResources, getBookList } from './helper';
import {
  server,
  defaultTplBible,
  defaultBibleReference,
  languages,
  bibleList,
} from './config/base';

export const AppContext = React.createContext();

const _currentLanguage = localStorage.getItem('i18nextLng')
  ? localStorage.getItem('i18nextLng')
  : languages[0];

const _appConfig = localStorage.getItem('appConfig')
  ? JSON.parse(localStorage.getItem('appConfig'))
  : defaultTplBible[_currentLanguage];

let _reference = localStorage.getItem('reference')
  ? JSON.parse(localStorage.getItem('reference'))
  : defaultBibleReference[_currentLanguage];

let _resourcesApp = localStorage.getItem('resourcesApp')
  ? JSON.parse(localStorage.getItem('resourcesApp'))
  : [];

let _fontSize = parseInt(localStorage.getItem('fontSize'));

const config = { server };

export function AppContextProvider({ children }) {
  let history = useHistory();
  let location = useLocation();
  const { t } = useTranslation();

  const currentLocation = location.pathname.split('/');
  const locationReference = {
    bookId: currentLocation[1] ? currentLocation[1] : _reference.bookId,
    chapter: currentLocation[2] ?? _reference.chapter,
    verse: currentLocation[3] ?? _reference.verse ?? 1,
  };

  const onChangeReference = (bookId, chapter, verse) => {
    console.log([{ bookId, chapter, verse }]);
  };

  const {
    state: { bookId, chapter, verse, bookList, chapterList, verseList },
    actions: {
      goToBookChapterVerse,
      applyBooksFilter,
      getFullBookList,
      getFilteredBookList,
      goToPrevBook,
      goToNextBook,
      goToPrevChapter,
      goToNextChapter,
      goToPrevVerse,
      goToNextVerse,
      onChangeBook,
      onChangeChapter,
      onChangeVerse,
      setNewBookList,
    },
  } = useBibleReference({
    initialBook: locationReference.bookId,
    initialChapter: locationReference.chapter,
    initialVerse: locationReference.verse,
    onChange: onChangeReference,
  });

  console.log({ bookId, chapter, verse });

  const [refList, setRefList] = useState({
    bookList: [],
    chapterList: [],
    verseList: [],
  });

  useEffect(() => {
    setReferenceSelected({ bookId, chapter, verse });
  }, [bookId, chapter, verse]);

  useEffect(() => {
    applyBooksFilter(null);
  }, []);

  useEffect(() => {
    setRefList({ bookList, chapterList, verseList });
  }, [bookList, chapterList, verseList]);

  const [currentLanguage, setCurrentLanguage] = useState(_currentLanguage);
  const [appConfig, setAppConfig] = useState(_appConfig);
  const [referenceSelected, setReferenceSelected] = useState({ ...locationReference });

  const [resourcesApp, setResourcesApp] = useState(_resourcesApp);

  const [referenceBlock, setReferenceBlock] = useState({});
  const _resourceLinks = getResources(appConfig, resourcesApp);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [showBookSelect, setShowBookSelect] = useState(true);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [showErrorReport, setShowErrorReport] = useState(false);
  const [fontSize, setFontSize] = useState(_fontSize ? _fontSize : 100);

  localStorage.setItem('fontSize', fontSize);

  useEffect(() => {
    setResourceLinks(getResources(appConfig, resourcesApp));
  }, [appConfig, resourcesApp]);

  useEffect(() => {
    setNewBookList(getBookList(bibleList, t));
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('resourcesApp', JSON.stringify(resourcesApp));
  }, [resourcesApp]);

  React.useEffect(() => {
    if (JSON.stringify(referenceSelected) !== JSON.stringify(locationReference)) {
      console.log({
        referenceSelected,
        locationReference,
        eq: locationReference !== referenceSelected,
      });
      setReferenceSelected({
        bookId: locationReference.bookId,
        chapter: locationReference.chapter,
        verse: locationReference.verse,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationReference.bookId, locationReference.chapter, locationReference.verse]);

  useEffect(() => {
    if (
      history.location.pathname !==
      '/' +
        referenceSelected.bookId +
        '/' +
        referenceSelected.chapter +
        '/' +
        referenceSelected.verse
    ) {
      history.push(
        '/' +
          referenceSelected.bookId +
          '/' +
          referenceSelected.chapter +
          '/' +
          referenceSelected.verse
      );
      localStorage.setItem(
        'reference',
        JSON.stringify({
          bookId: referenceSelected.bookId,
          chapter: referenceSelected.chapter,
          verse: referenceSelected.verse,
        })
      );
      goToBookChapterVerse(
        referenceSelected.bookId,
        referenceSelected.chapter,
        referenceSelected.verse
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    referenceSelected.bookId,
    referenceSelected.chapter,
    referenceSelected.verse,
    history,
  ]);

  const value = {
    state: {
      appConfig,
      referenceSelected,
      resourceLinks,
      resourcesApp,
      resources,
      _resourceLinks,
      showBookSelect,
      showChapterSelect,
      showErrorReport,
      referenceBlock,
      fontSize,
      currentLanguage,
      refList,
    },
    actions: {
      setAppConfig,
      setReferenceSelected,
      setResourceLinks,
      setResourcesApp,
      setResources,
      setShowBookSelect,
      setShowChapterSelect,
      setShowErrorReport,
      setReferenceBlock,
      setFontSize,
      setCurrentLanguage,
      applyBooksFilter,
      goToNextChapter,
      goToPrevChapter,
      goToPrevBook,
      goToNextBook,
    },
  };

  return (
    <AppContext.Provider value={value}>
      <ResourcesContextProvider
        reference={{
          bookId: referenceSelected.bookId,
          chapter: referenceSelected.chapter,
        }}
        resourceLinks={resourceLinks}
        defaultResourceLinks={_resourceLinks}
        onResourceLinks={setResourceLinks}
        resources={resources}
        onResources={setResources}
        config={config}
      >
        {children}
      </ResourcesContextProvider>
    </AppContext.Provider>
  );
}
