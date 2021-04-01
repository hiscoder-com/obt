import React from 'react';

import BookList from '../BookList/BookList';

import { Button, Dialog, DialogContent } from '@material-ui/core';

function ChapterSelect(props) {
  const { referenceSelected, setReferenceSelected } = props;
  const [showBookSelect, setShowBookSelect] = React.useState(false);

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
        style={{ marginLeft: '10px' }}
        variant="contained"
        color="secondary"
        onClick={() => setShowBookSelect(!showBookSelect)}
      >
        {referenceSelected.chapter} ch.
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

export default ChapterSelect;
