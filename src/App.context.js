import React, { useState, useEffect } from 'react';

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

const _reference = localStorage.getItem('reference')
  ? JSON.parse(localStorage.getItem('reference'))
  : defaultReference;

const config = { server };

export function AppContextProvider({ children }) {
  const [appConfig, setAppConfig] = useState(_appConfig);
  const [referenceSelected, setReferenceSelected] = useState(_reference);
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
  }, [referenceSelected]);

  const value = {
    state: {
      appConfig,
      referenceSelected,
      resourceLinks,
      resources,
      _resourceLinks,
      showBookSelect,
      showChapterSelect,
    },
    actions: {
      setAppConfig,
      setReferenceSelected,
      setResourceLinks,
      setResources,
      setShowBookSelect,
      setShowChapterSelect,
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
