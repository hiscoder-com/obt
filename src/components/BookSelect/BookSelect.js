import React, { useState } from 'react';

import BookList from '../BookList/BookList';

import { Button, Dialog, DialogContent } from '@material-ui/core';

import { bibleList } from '../../config';

function BookSelect(props) {
  const { referenceSelected, setReferenceSelected } = props;
  const [showBookSelect, setShowBookSelect] = useState(false);

  const onBook = (project) => {
    setShowBookSelect(false);
    setReferenceSelected({
      ...referenceSelected,
      bookId: project ? project.identifier : null,
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowBookSelect(!showBookSelect)}
      >
        {
          bibleList.filter((book) => book.identifier === referenceSelected.bookId)[0]
            ?.title
        }{' '}
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showBookSelect}
        onClose={() => setShowBookSelect(false)}
      >
        <DialogContent>
          <BookList onBook={onBook} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookSelect;
