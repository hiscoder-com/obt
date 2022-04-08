import React from 'react';

import { Divider, InputLabel } from '@material-ui/core';

import { useStyles } from './style';

function SettingsItem({ title, children }) {
  const classes = useStyles();
  return (
    <>
      <Divider className={classes.divider} light />
      <InputLabel className={classes.inputLabel} shrink>
        {title}
      </InputLabel>
      {children}
    </>
  );
}

export default SettingsItem;
