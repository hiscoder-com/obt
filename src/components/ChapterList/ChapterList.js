import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChapterList as ChapterListRCL } from 'demo-bsa-reference-rcl';

import { chaptersConfig } from './config';

import useStyles from './style';

function ChapterList({ setReferenceSelected, referenceSelected, onClose }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const onClickChapter = (chapterId) => {
    setReferenceSelected({ ...referenceSelected, chapter: chapterId, verse: 1 });
    onClose();
  };
  return (
    <ChapterListRCL
      selectedChapter={referenceSelected.chapter}
      chapters={Object.keys(chaptersConfig[referenceSelected.bookId])}
      title={t('Chapter')}
      marginSize={10}
      onClickChapter={onClickChapter}
      chapterWrapClass={classes.root}
     
    />
  );
}

export default ChapterList;
