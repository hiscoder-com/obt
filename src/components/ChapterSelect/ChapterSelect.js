import React, { useContext } from 'react';


import { useTranslation } from 'react-i18next';
import { Chapter as ChapterRCL } from '@texttree/tt-reference-rcl';

import { AppContext, ReferenceContext } from '../../context';
import { ChapterList } from '../../components';


import { Dialog, DialogContent } from '@material-ui/core';

function ChapterSelect() {
  const {
    state: { showChapterSelect },
    actions: { setShowChapterSelect },
  } = useContext(AppContext);

  const onClose = () => {
    setShowChapterSelect(false);
  };

  return (
    <>
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

      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showChapterSelect}
        onClose={() => setShowChapterSelect(false)}
      >
        <DialogContent className={'intro-chapterList'}>
          <ChapterList onClose={onClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChapterSelect;
