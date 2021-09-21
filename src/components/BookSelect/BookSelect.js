import React, { useContext } from 'react';

import { AppContext } from '../../context';
import { BookList } from '../../components';

import { Dialog, DialogContent } from '@material-ui/core';

function BookSelect() {
  const {
    state: { showBookSelect },
    actions: { setShowBookSelect },
  } = useContext(AppContext);

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showBookSelect}
        onClose={() => setShowBookSelect(false)}
      >
        <DialogContent className={'intro-bookList'}>
          <BookList />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookSelect;
