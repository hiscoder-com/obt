import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import './i18next';
import ContextProviders from './context/ContextProviders';
import './styles/style.css';

// const App = React.lazy(() => import('./App.js'));

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
