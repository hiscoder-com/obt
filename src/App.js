import React, { useContext } from 'react';

import { CssBaseline } from '@material-ui/core';

import { AppContext } from './context';
import {
  Shortcut,
  Swipes,
  Intro,
  TypoReport,
  SubMenuBar,
  StartDialog,
} from './components';
import WorkSpaceWrap from './WorkSpaceWrap';

import { themes } from './themes';
import { ThemeProvider } from '@material-ui/styles';
import './styles/app.css';
import { LinkDialog } from './components/LinkDialog';

//const Intro = React.lazy(() => import('./components/Intro/Intro'));
//const Card = React.lazy(() => import('./components/Card/Card'));
//const TypoReport = React.lazy(() => import('./components/TypoReport/TypoReport'));
//const SubMenuBar = React.lazy(() => import('./components/SubMenuBar/SubMenuBar'));

export default function App() {
  const {
    state: { theme },
  } = useContext(AppContext);

  Shortcut();
  Swipes();
  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <StartDialog />
      <Intro />
      <SubMenuBar />
      <TypoReport />
      <WorkSpaceWrap />
      <LinkDialog />
    </ThemeProvider>
  );
}
