import React, { useContext } from 'react';

import { AppContext } from '../../context';
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
