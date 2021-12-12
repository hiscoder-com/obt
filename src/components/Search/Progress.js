import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    marginTop: theme.spacing(10),
  },
}));

export default function Progress() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div>Searching</div>
        <LinearProgress style={{ height: 20 }} variant={'indeterminate'} />
      </div>
    </>
  );
}
