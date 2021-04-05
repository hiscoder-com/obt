import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import SelectLanguage from './SelectLanguage/SelectLanguage';
import Logo from './Logo/Logo';
import useStyles from './styled';

export default function MenuBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <div className={classes.toolBar}>
            <Logo className={classes.logo} size="45" />

            <Typography className={classes.title} variant="h6" noWrap>
              BSA
            </Typography>
          </div>

          <SelectLanguage className={classes.selectLanguage} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
