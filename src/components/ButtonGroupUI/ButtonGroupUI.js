import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ButtonGroupUI({ onBookClick, onChapterClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        variant="text"
        // orientation="vertical"
        color="black"
        aria-label="outlined primary button group"
      >
        <Button onClick={onBookClick}>Book front</Button>
        <Button onClick={onChapterClick}>Chapter front</Button>
      </ButtonGroup>
    </div>
  );
}
