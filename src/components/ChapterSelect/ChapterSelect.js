import React from 'react';

import ChapterSelection from '../ChapterList/ChapterSelection';

import { Button, Dialog, DialogContent } from '@material-ui/core';

import useStyles from './styled';

function ChapterSelect({ referenceSelected, setReferenceSelected }) {
  const [showChapterSelect, setShowChapterSelect] = React.useState(false);

  const onClose = () => {
    setShowChapterSelect(false);
  };
  const classes = useStyles();
  return (
    <>
      <Button
        style={{ marginLeft: '10px' }}
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => setShowChapterSelect(!showChapterSelect)}
      >
        {referenceSelected.chapter} ch.
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showChapterSelect}
        onClose={() => setShowChapterSelect(false)}
      >
        <DialogContent>
          <ChapterSelection
            setReferenceSelected={setReferenceSelected}
            referenceSelected={referenceSelected}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChapterSelect;
