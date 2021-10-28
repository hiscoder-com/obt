import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

function Base({ children, widthBase }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      {children}
    </Paper>
  );
}

export default Base;
