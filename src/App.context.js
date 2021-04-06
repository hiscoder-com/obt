import React, { useState } from 'react';

export const AppContext = React.createContext();

const _appConfig = localStorage.getItem('appConfig')
  ? JSON.parse(localStorage.getItem('appConfig'))
  : [
      { w: 4, h: 5, x: 0, y: 0, i: 'rob' },
      { w: 4, h: 5, x: 4, y: 0, i: 'tn' },
      { w: 4, h: 5, x: 8, y: 0, i: 'ult' },
    ];

export function AppContextProvider({ children }) {
  const [appConfig, setAppConfig] = useState(_appConfig);

  const value = {
    state: { appConfig },
    actions: { setAppConfig },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
