import React, { useContext } from 'react';

import { AppContext } from '../../context';
import { DialogUI, BookList } from '../../components';

function BookSelect() {
  const {
    state: { showBookSelect },
    actions: { setShowBookSelect },
  } = useContext(AppContext);

  return (
    <>
      <DialogUI
        maxWidth={'lg'}
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
