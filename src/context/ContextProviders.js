import React from 'react';

import { AppContextProvider, ReferenceContextProvider } from '../context';

export default function ContextProviders({ children }) {
  return (
    <ReferenceContextProvider>
      <AppContextProvider>{children}</AppContextProvider>
    </ReferenceContextProvider>
  );
}
