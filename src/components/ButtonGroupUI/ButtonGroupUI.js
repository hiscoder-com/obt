import React from 'react';

import useStyles, { useButtonStyles } from './style';
import { ButtonGroup, Button } from '@material-ui/core';

export default function ButtonGroupUI({
  onFirstButtonClick,
  onSecondButtonClick,
  titleFirst,
  titleSecond,
}) {
  const classes = useStyles();
  const classesButton = useButtonStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup variant="text" aria-label="outlined primary button group">
        <Button className={classesButton.root} onClick={onFirstButtonClick}>
          {titleFirst}
        </Button>
        <Button className={classesButton.root} onClick={onSecondButtonClick}>
          {titleSecond}
        </Button>
      </ButtonGroup>
    </div>
  );
}
