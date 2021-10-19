import React from 'react';

import { AppContextProvider } from './AppContext';
import { ReferenceContextProvider } from './ReferenceContext';
import { ResourceContextProvider } from './ResourceContext';
export default function ContextProviders({ children }) {
  return (
    <ReferenceContextProvider>
      <AppContextProvider>
        <ResourceContextProvider>{children}</ResourceContextProvider>
      </AppContextProvider>
    </ReferenceContextProvider>
  );
}
