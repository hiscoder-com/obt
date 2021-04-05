import React from 'react';

import { ChaptersConfig } from './config';

import Button from '@material-ui/core/Button';

import useStyles from './styled';

function ChapterSelection(props) {
  const { setReferenceSelected, referenceSelected, onClose } = props;

  const classes = useStyles();

  return (
    <>
      {ChaptersConfig
        ? Object.keys(ChaptersConfig[referenceSelected.bookId]).map((key) => (
            <Button
              variant="contained"
              className={classes.root}
              key={key}
              onClick={() => {
                setReferenceSelected({ ...referenceSelected, chapter: key });
                onClose();
              }}
            >
              Глава{key}
            </Button>
          ))
        : ''}
    </>
  );
}

export default ChapterSelection;
