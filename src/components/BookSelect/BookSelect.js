import React, { useContext } from 'react';

import { AppContext } from '../../App.context';
import BookList from '../BookList/BookList';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, DialogContent } from '@material-ui/core';

function BookSelect() {
  const { t } = useTranslation();

  const { state, actions } = useContext(AppContext);
  const { referenceSelected, showBookSelect } = state;
  const { setShowBookSelect } = actions;

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
          <BookList />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookSelect;
