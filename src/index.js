import React from 'react';
import ReactDOM from 'react-dom';

import './i18next';

import App from './App';
import { AppContextProvider } from './App.context';

import './styles/style.css';

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById('root')
);
