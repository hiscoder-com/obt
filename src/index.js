import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './i18next';
import App from './App';
import { AppContextProvider } from './context/AppContext';
import { ReferenceContextProvider } from './context/ReferenceContext';
import './styles/style.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <ReferenceContextProvider>
        <AppContextProvider>
          <Route>
            <App />
          </Route>
        </AppContextProvider>
      </ReferenceContextProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
