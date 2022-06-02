import React from 'react';

import { AppContextProvider, ReferenceContextProvider, AuthContext } from '../context';

export default function ContextProviders({ children }) {
  return (
    <AuthContext>
      <ReferenceContextProvider>
        <AppContextProvider>{children}</AppContextProvider>
      </ReferenceContextProvider>
    </AuthContext>
  );
}
