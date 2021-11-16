import React, { useContext } from 'react';

import { AppContext } from '../../context';
import { BookList } from '../../components';

import DialogUI from '../DialogUI/DialogUI';

function BookSelect() {
  const {
    state: { showBookSelect },
    actions: { setShowBookSelect },
  } = useContext(AppContext);

  return (
    <>
      <DialogUI
        style={{ fullWidth: true, maxWidth: 'lg' }}
        open={showBookSelect}
        onClose={() => setShowBookSelect(false)}
        classes={{ content: 'intro-bookList' }}
      >
        <BookList />
      </DialogUI>
    </>
  );
}

export default BookSelect;
