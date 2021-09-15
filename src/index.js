import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './i18next';
import ContextProviders from './context/ContextProviders';
import './styles/style.css';

const App = React.lazy(() => import('./App.js'));

ReactDOM.render(
  <Suspense
    fallback={
      <div
        style={{
          backgroundColor: 'green',
          color: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2em',
        }}
      >
        <span>Loading...</span>
      </div>
    }
  >
    <BrowserRouter>
      <Switch>
        <ContextProviders>
          <Route>
            <App />
          </Route>
        </ContextProviders>
      </Switch>
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);
