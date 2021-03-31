import React from 'react';

import BookList from '../BookList/BookList';

import {
  AppBar,
  Button,
  Toolbar,
  Fab,
  Dialog,
  DialogContent,
  MenuItem,
  Menu,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

import { bibleList, resourcesList } from '../../config';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 !important',
    margin: '0 1px !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  dragIndicator: {},
}));

function BookSelect(props) {
  const { setAppConfig, referenceSelected, setReferenceSelected, appConfig } = props;
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
      <Toolbar style={{ margin: '0 auto' }}>
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
        <Button
          style={{ marginLeft: '10px' }}
          variant="contained"
          color="secondary"
          onClick={() => setShowBookSelect(!showBookSelect)}
        >
          {referenceSelected.chapter} ch.
        </Button>
      </Toolbar>

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
