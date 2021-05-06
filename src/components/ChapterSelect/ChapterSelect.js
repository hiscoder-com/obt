import React, { useContext } from 'react';

import { AppContext } from '../../App.context';
import { ChapterList } from '../ChapterList';
import { useTranslation } from 'react-i18next';
import { Chapter as ChapterRCL } from 'demo-bsa-reference-rcl';
import { Dialog, DialogContent } from '@material-ui/core';

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
      <ChapterRCL
        className={classes.inherit}
        onClick={() => setShowChapterSelect(!showChapterSelect)}
        chapterKey={referenceSelected.chapter}
        title={t('Chapter')}
        currentChapter={true}
      ></ChapterRCL>
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
