import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';

import BookList from '../BookList/BookList';

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
        <DialogContent>
          <BookList />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookSelect;
