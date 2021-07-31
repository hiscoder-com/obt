import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { Book as BookRCL } from '@texttree/tt-reference-rcl';

import { AppContext } from '../../App.context';
import { ReferenceContext } from '../../ReferenceContext';
import BookList from '../BookList/BookList';

import { Dialog, DialogContent } from '@material-ui/core';
import useBookStyles from './style';

function BookSelect() {
  const { t } = useTranslation();

  const {
    state: { showBookSelect },
    actions: { setShowBookSelect },
  } = useContext(AppContext);

  const {
    state: { referenceSelected },
  } = useContext(ReferenceContext);

  const bookClasses = useBookStyles();

  return (
    <>
      <BookRCL
        classes={bookClasses}
        onClick={() => setShowBookSelect(!showBookSelect)}
        text={t(referenceSelected.bookId ?? 'not_set')}
      />
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
