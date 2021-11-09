import React from 'react';

import useStyles, { useButtonStyles } from './style';
import { ButtonGroup, Button } from '@material-ui/core';

export default function ButtonGroupUI({ onBookClick, onChapterClick }) {
  const classes = useStyles();
  const classesButton = useButtonStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        variant="text"
        color="black"
        aria-label="outlined primary button group"
      >
        <Button className={classesButton.root} onClick={onBookClick}>
          Book front
        </Button>
        <Button className={classesButton.root} onClick={onChapterClick}>
          Chapter front
        </Button>
      </ButtonGroup>
    </div>
  );
}
