import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './i18next';
import App from './App';
import { AppContextProvider } from './App.context';

import './styles/style.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <AppContextProvider>
        <Route path="/:bookId?/:chapter?">
          <App />
        </Route>
      </AppContextProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
