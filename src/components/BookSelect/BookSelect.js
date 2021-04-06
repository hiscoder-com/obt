import React from 'react';

import BookList from '../BookList/BookList';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, DialogContent } from '@material-ui/core';

function BookSelect(props) {
  const {
    referenceSelected,
    setReferenceSelected,
    showBookSelect,
    setShowBookSelect,
    setShowChapterSelect,
    showChapterSelect,
  } = props;
  const { t } = useTranslation();

  const onBook = (identifier) => {
    setShowBookSelect(false);
    setReferenceSelected({
      ...referenceSelected,
      bookId: identifier ?? null,
      chapter: 1,
      verse: 1,
    });
    setShowChapterSelect(!showChapterSelect);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowBookSelect(!showBookSelect)}
      >
        {t(referenceSelected.bookId ?? 'not_set')}
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showBookSelect}
        onClose={() => setShowBookSelect(false)}
      >
        <DialogContent>
          <BookList onBook={onBook} referenceSelected={referenceSelected} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookSelect;
