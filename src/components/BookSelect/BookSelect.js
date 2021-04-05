import React from 'react';

import BookList from '../BookList/BookList';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, DialogContent } from '@material-ui/core';

import { bibleList } from '../../config';

function BookSelect(props) {
  const {
    referenceSelected,
    setReferenceSelected,
    showBookSelect,
    setShowBookSelect,
    setShowChapterSelect,
    showChapterSelect,
  } = props;
  const { i18n } = useTranslation();

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
        {i18n.language === 'eng'
          ? bibleList.filter((book) => book.identifier === referenceSelected.bookId)[0]
              ?.title
          : bibleList.filter((book) => book.identifier === referenceSelected.bookId)[0]
              ?.rutitle}
        :{' '}
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
