import React from 'react';

import { AppContextProvider } from './AppContext';
import { ReferenceContextProvider } from './ReferenceContext';

export default function ContextProviders({ children }) {
  return (
    <ReferenceContextProvider>
      <AppContextProvider>{children}</AppContextProvider>
    </ReferenceContextProvider>
  );
}
