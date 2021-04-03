import React from 'react';

import { ChaptersConfig } from './config';

import useStyles from './styled';

function ChapterSelection(props) {
  const { setReferenceSelected, referenceSelected, onClose } = props;

  const classes = useStyles();

  return (
    <>
      {ChaptersConfig
        ? Object.keys(ChaptersConfig[referenceSelected.bookId]).map((key) => (
            <button
              key={key}
              className={classes.button}
              onClick={() => {
                setReferenceSelected({ ...referenceSelected, chapter: key });
                onClose();
              }}
            >
              Глава{key}
            </button>
          ))
        : ''}
    </>
  );
}

export default ChapterSelection;
