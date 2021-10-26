import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

function Base({ children, widthBase }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(widthBase),
        minHeight: theme.spacing(50),
      },
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0}>{children}</Paper>
    </div>
  );
}

export default Base;
