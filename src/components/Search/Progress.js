import React from 'react';
import { makeStyles, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    marginTop: theme.spacing(10),
  },
  linear: {
    height: 20,
  },
}));

export default function Progress() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div>Searching</div>
        <LinearProgress className={classes.linear} variant={'indeterminate'} />
      </div>
    </>
  );
}
