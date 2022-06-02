import React from 'react';
import { AuthenticationContextProvider } from 'gitea-react-toolkit';
import localforage from 'localforage';

export function AuthContext({ children }) {
  const [authentication, setAuthentication] = React.useState();
  const myAuthStore = localforage.createInstance({
    driver: [localforage.INDEXEDDB],
    name: 'my-auth-store',
  });
  const getAuth = async () => {
    let authentication = await myAuthStore.getItem('authentication');
    return authentication;
  };

  const saveAuth = async (authentication) => {
    if (authentication === undefined || authentication === null) {
      await myAuthStore.removeItem('authentication');
    } else {
      await myAuthStore
        .setItem('authentication', authentication)
        .then(function (authentication) {
          console.log('saveAuth() success. authentication is:', authentication);
        })
        .catch(function (err) {
          // This code runs if there were any errors
          console.log('saveAuth() failed. err:', err);
          console.log('saveAuth() failed. authentication:', authentication);
        });
    }
  };
  const config = {
    server: 'https://git.door43.org',
    tokenid: 'PlaygroundTesting',
  };

  const messages = {
    actionText: 'Authenticate',
    genericError: 'Something happened!',
    usernameError: 'No user found?',
    passwordError: 'Did you fat finger your password?',
    networkError: 'There is an issue with your network connection. Please try again.',
    serverError: 'There is an issue with the server please try again.',
  };

  return (
    <AuthenticationContextProvider
      messages={messages}
      config={config}
      authentication={authentication}
      onAuthentication={setAuthentication}
      loadAuthentication={getAuth}
      saveAuthentication={saveAuth}
    >
      {children}
    </AuthenticationContextProvider>
  );
}

export default AuthContext;
