import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './i18next';
import App from './App';
import ContextProviders from './context/ContextProviders';
import './styles/style.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <ContextProviders>
        <Route>
          <App />
        </Route>
      </ContextProviders>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
