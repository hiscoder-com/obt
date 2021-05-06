import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './i18next';

import App from './App';
import { AboutPage, ContactPage } from './components';
import { AppContextProvider } from './App.context';

import './styles/style.css';

ReactDOM.render(
  <BrowserRouter>
    <AppContextProvider>
      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route path="/:bookId?/:chapter?">
          <App />
        </Route>
      </Switch>
    </AppContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
