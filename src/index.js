import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import './i18next';

import App from './App';
import { AppContextProvider } from './App.context';

import './styles/style.css';

ReactDOM.render(
  <Suspense fallback={<div>Loading ~~~</div>}>
    <React.StrictMode>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
