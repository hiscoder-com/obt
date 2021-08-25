import React, { useState, useEffect, useContext } from 'react';

import { ResourcesContextProvider } from 'scripture-resources-rcl';

import { useTranslation } from 'react-i18next';
import { ReferenceContext } from './ReferenceContext';
import { getResources, getBookList, checkLSVal } from '../helper';
import {
  server,
  defaultTplBible,
  defaultTplOBS,
  languages,
  bibleList,
} from '../config/base';

export const AppContext = React.createContext();

const _currentLanguage = checkLSVal('i18nextLng', languages[0]);
const _resourcesApp = checkLSVal('resourcesApp', [], false);

const _loadIntro = checkLSVal('loadIntro', false);

const _fontSize = parseInt(localStorage.getItem('fontSize'));

const config = { server };

export function AppContextProvider({ children }) {
  const {
    state: { referenceSelected },
    actions: { setNewBookList },
  } = useContext(ReferenceContext);

  const [currentLanguage, setCurrentLanguage] = useState(_currentLanguage);
  const initialPositionContextMenu = {
    mouseX: null,
    mouseY: null,
  };
  const [appConfig, setAppConfig] = useState(
    () =>
      checkLSVal(
        'appConfig',
        {
          bible: defaultTplBible[_currentLanguage],
          obs: defaultTplOBS[_currentLanguage],
        },
        false,
        'bible'
      )[referenceSelected.bookId === 'obs' ? 'obs' : 'bible']
  );

  const [resourcesApp, setResourcesApp] = useState(_resourcesApp);
  const _resourceLinks = getResources(appConfig, resourcesApp);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [showBookSelect, setShowBookSelect] = useState(false);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [showErrorReport, setShowErrorReport] = useState(false);
  const [errorFile, setErrorFile] = useState('');
  const [fontSize, setFontSize] = useState(_fontSize ? _fontSize : 100);
  const [loadIntro, setLoadIntro] = useState(_loadIntro);
  const [introContextMenuOpen, setIntroContextMenuOpen] = useState(false);
  const [openMainMenu, setOpenMainMenu] = useState(false);
  const [introContextMenuPosition, setIntroContextMenuPosition] = useState(null);
  const [positionContextMenu, setPositionContextMenu] = React.useState(
    initialPositionContextMenu
  );
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    setResourceLinks(getResources(appConfig, resourcesApp));
  }, [appConfig, resourcesApp]);

  useEffect(() => {
    setNewBookList(getBookList(bibleList, t), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('resourcesApp', JSON.stringify(resourcesApp));
  }, [resourcesApp]);

  useEffect(() => {
    localStorage.setItem('loadIntro', true);
  }, []);

  const value = {
    state: {
      appConfig,
      currentLanguage,
      errorFile,
      fontSize,
      introContextMenuOpen,
      introContextMenuPosition,
      loadIntro,
      openMainMenu,
      positionContextMenu,
      resourceLinks,
      resourcesApp,
      resources,
      _resourceLinks,
      showBookSelect,
      showChapterSelect,
      showErrorReport,
      initialPositionContextMenu,
    },
    actions: {
      setAppConfig,
      setCurrentLanguage,
      setErrorFile,
      setFontSize,
      setIntroContextMenuOpen,
      setIntroContextMenuPosition,
      setLoadIntro,
      setOpenMainMenu,
      setPositionContextMenu,
      setResourceLinks,
      setResourcesApp,
      setResources,
      setShowBookSelect,
      setShowChapterSelect,
      setShowErrorReport,
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
