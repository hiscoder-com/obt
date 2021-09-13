import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';

import { ChapterList } from '../ChapterList';

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
        <DialogContent>
          <ChapterList onClose={onClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChapterSelect;
