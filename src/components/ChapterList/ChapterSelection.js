import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChaptersConfig } from './config';

import Button from '@material-ui/core/Button';

import useStyles from './styled';

function ChapterSelection(props) {
  const { setReferenceSelected, referenceSelected, onClose } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const currentElement = (key, color: '') => {
    return (
      <Button
        variant="contained"
        color={color}
        className={classes.root}
        key={key}
        onClick={() => {
          setReferenceSelected({ ...referenceSelected, chapter: key, verse: 1 });
          onClose();
        }}
      >
        {t('Chapter')}
        {key}
      </Button>
    );
  };
  return (
    <>
      {ChaptersConfig
     
        ? Object.keys(ChaptersConfig[referenceSelected.bookId]).map((key) =>
            referenceSelected.chapter === key
              ? currentElement(key, 'primary')
              : currentElement(key)
          )

        : ''}
    </>
  );
}

export default ChapterSelection;
