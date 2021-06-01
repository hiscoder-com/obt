import React, { useContext } from 'react';

import { AppContext } from '../../App.context';
import { ChapterList } from '../ChapterList';
import { useTranslation } from 'react-i18next';
import { Chapter as ChapterRCL } from '@texttree/tt-reference-rcl';
import { Dialog, DialogContent } from '@material-ui/core';

import useStyles from './style';

function ChapterSelect() {
  const { state, actions } = useContext(AppContext);
  const { referenceSelected, showChapterSelect } = state;
  const { setReferenceSelected, setShowChapterSelect } = actions;

  const onClose = () => {
    setShowChapterSelect(false);
  };
  const onOpen = () => {
    state.resources.length > 0
      ? setShowChapterSelect(!showChapterSelect)
      : setShowChapterSelect(false);
  };
  const { t } = useTranslation();

  const chapterClasses = useStyles();

  return (
    <>
      <ChapterRCL
        classes={chapterClasses}
        onClick={onOpen}
        chapterId={referenceSelected.chapter}
        chapterPrefix={referenceSelected.bookId === 'psa' ? t('Psalm') : t('Chapter')}
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
