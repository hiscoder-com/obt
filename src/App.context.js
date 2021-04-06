import React, { useState, useEffect } from 'react';

import { getResources } from './helper';

export const AppContext = React.createContext();

const _appConfig = localStorage.getItem('appConfig')
  ? JSON.parse(localStorage.getItem('appConfig'))
  : [
      { w: 4, h: 5, x: 0, y: 0, i: 'rob' },
      { w: 4, h: 5, x: 4, y: 0, i: 'tn' },
      { w: 4, h: 5, x: 8, y: 0, i: 'ult' },
    ];

const _reference = localStorage.getItem('reference')
  ? JSON.parse(localStorage.getItem('reference'))
  : {
      bookId: 'rut',
      chapter: 1,
      verse: 1,
    };

export function AppContextProvider({ children }) {
  const [appConfig, setAppConfig] = useState(_appConfig);
  const [referenceSelected, setReferenceSelected] = useState(_reference);
  const _resourceLinks = getResources(appConfig);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    setResourceLinks(getResources(appConfig));
  }, [appConfig]);

  const value = {
    state: { appConfig, referenceSelected, resourceLinks, resources, _resourceLinks },
    actions: { setAppConfig, setReferenceSelected, setResourceLinks, setResources },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
