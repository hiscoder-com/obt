import React from 'react';

import {
  Shortcut,
  Swipes,
  Intro,
  TypoReport,
  SubMenuBar,
  StartDialog,
} from './components';
import './styles/app.css';
import { ThemeProvider } from '@material-ui/styles';
import { themeDark, themeDefault, themeTt } from './themes';
import WorkSpaceWrap from './WorkSpaceWrap';
import { CssBaseline } from '@material-ui/core';

//const Intro = React.lazy(() => import('./components/Intro/Intro'));
//const Card = React.lazy(() => import('./components/Card/Card'));
//const TypoReport = React.lazy(() => import('./components/TypoReport/TypoReport'));
//const SubMenuBar = React.lazy(() => import('./components/SubMenuBar/SubMenuBar'));

export default function App() {
  Shortcut();
  Swipes();
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <StartDialog />
      <Intro />
      <SubMenuBar />
      <TypoReport />
      <WorkSpaceWrap />
    </ThemeProvider>
  );
}
