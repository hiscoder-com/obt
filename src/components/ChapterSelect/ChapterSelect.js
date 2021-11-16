import React, { useContext } from 'react';

import { AppContext } from '../../context';
import { ChapterList } from '../../components';

import DialogUI from '../DialogUI/DialogUI';

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
        style={{ fullWidth: true, maxWidth: 'lg' }}
        open={showChapterSelect}
        onClose={() => setShowChapterSelect(false)}
        classes={{ content: 'intro-chapterList' }}
      >
        <ChapterList onClose={onClose} />
      </DialogUI>
    </>
  );
}

export default ChapterSelect;
