import React, { useContext } from 'react';

import { AppContext } from '../../context';
import { DialogUI, ChapterList } from '../../components';

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
      <DialogUI
        maxWidth={'lg'}
        open={showChapterSelect}
        onClose={onClose}
        classes={{ content: 'intro-chapterList' }}
      >
        <ChapterList onClose={onClose} />
      </DialogUI>
    </>
  );
}

export default ChapterSelect;
