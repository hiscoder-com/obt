import React, { useContext } from 'react';

import { AppContext } from '../../App.context';
import { ChapterList } from '../ChapterList';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, DialogContent } from '@material-ui/core';

import useStyles from './style';

function ChapterSelect() {
  const { state, actions } = useContext(AppContext);
  const { referenceSelected, showChapterSelect } = state;
  const { setReferenceSelected, setShowChapterSelect } = actions;

  const onClose = () => {
    setShowChapterSelect(false);
  };
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.root}
        ml={1}
        variant="contained"
        color="secondary"
        onClick={() => setShowChapterSelect(!showChapterSelect)}
      >
        {referenceSelected.chapter} {t('Chapter')}
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showChapterSelect}
        onClose={() => setShowChapterSelect(false)}
      >
        <DialogContent>
          <ChapterList
            setReferenceSelected={setReferenceSelected}
            referenceSelected={referenceSelected}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChapterSelect;
