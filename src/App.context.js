import React from 'react';

export const AppContext = React.createContext();

export function AppContextProvider({ children }) {
  const value = {
    state: 'state',
    actions: 'actions',
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
