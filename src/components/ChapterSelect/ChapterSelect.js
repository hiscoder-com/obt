import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { Chapter as ChapterRCL } from '@texttree/tt-reference-rcl';

import { AppContext } from '../../context/AppContext';
import { ReferenceContext } from '../../context/ReferenceContext';
import { ChapterList } from '../ChapterList';

import { Dialog, DialogContent } from '@material-ui/core';
import useStyles from './style';

function ChapterSelect() {
  const {
    state: { showChapterSelect, appConfig },
    actions: { setShowChapterSelect },
  } = useContext(AppContext);

  const {
    state: { referenceSelected },
  } = useContext(ReferenceContext);

  const onClose = () => {
    setShowChapterSelect(false);
  };
  const onOpen = () => {
    appConfig.length > 0
      ? setShowChapterSelect(!showChapterSelect)
      : setShowChapterSelect(false);
  };
  const { t } = useTranslation();

  const chapterClasses = useStyles();

  return (
    <>
      <div className={'intro-chapterSelect'}>
        <ChapterRCL
          classes={chapterClasses}
          onClick={onOpen}
          chapterId={referenceSelected.chapter}
          chapterPrefix={
            referenceSelected.bookId === 'psa'
              ? t('Psalm')
              : referenceSelected.bookId === 'obs'
              ? t('Story')
              : t('Chapter')
          }
          currentChapter={true}
        ></ChapterRCL>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showChapterSelect}
        onClose={() => setShowChapterSelect(false)}
      >
        <DialogContent>
          <ChapterList onClose={onClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChapterSelect;
