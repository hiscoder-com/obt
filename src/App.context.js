import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import {
  ResourcesContextProvider,
  ReferenceSelectedContextProvider,
} from 'scripture-resources-rcl';

import { getResources } from './helper';
import { server, defaultCards, defaultReference } from './config';

export const AppContext = React.createContext();

const _appConfig = localStorage.getItem('appConfig')
  ? JSON.parse(localStorage.getItem('appConfig'))
  : defaultCards;

let _reference = localStorage.getItem('reference')
  ? JSON.parse(localStorage.getItem('reference'))
  : defaultReference;

const config = { server };

export function AppContextProvider({ children }) {
  let history = useHistory();
  let location = useLocation();
  const currentLocation = location.pathname.split('/');

  const [appConfig, setAppConfig] = useState(_appConfig);
  const [referenceSelected, setReferenceSelected] = useState({
    bookId: currentLocation[1] ? currentLocation[1] : _reference.bookId,
    chapter: currentLocation[2] ?? _reference.chapter,
    verse: 1,
  });

  const [quote, setQuote] = useState('');
  const [type, setType] = useState('');
  const _resourceLinks = getResources(appConfig);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [showBookSelect, setShowBookSelect] = useState(true);
  const [showChapterSelect, setShowChapterSelect] = useState(false);

  useEffect(() => {
    setResourceLinks(getResources(appConfig));
  }, [appConfig]);

  useEffect(() => {
    localStorage.setItem('reference', JSON.stringify(referenceSelected));
    history.push('/' + referenceSelected.bookId + '/' + referenceSelected.chapter);
  }, [referenceSelected, history]);

  const value = {
    state: {
      appConfig,
      referenceSelected,
      resourceLinks,
      resources,
      _resourceLinks,
      showBookSelect,
      showChapterSelect,
      type,
      quote,
    },
    actions: {
      setAppConfig,
      setReferenceSelected,
      setResourceLinks,
      setResources,
      setShowBookSelect,
      setShowChapterSelect,
      setType,
      setQuote,
    },
  };

  return (
    <AppContext.Provider value={value}>
      <ResourcesContextProvider
        reference={referenceSelected}
        resourceLinks={resourceLinks}
        defaultResourceLinks={_resourceLinks}
        onResourceLinks={setResourceLinks}
        resources={resources}
        onResources={setResources}
        config={config}
      >
        <ReferenceSelectedContextProvider
          referenceSelected={referenceSelected}
          onReferenceSelected={setReferenceSelected}
        >
          {children}
        </ReferenceSelectedContextProvider>
      </ResourcesContextProvider>
    </AppContext.Provider>
  );
}
