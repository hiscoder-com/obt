import React from 'react';

import ChapterSelection from '../ChapterList/ChapterSelection';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, DialogContent } from '@material-ui/core';

function ChapterSelect({ referenceSelected, setReferenceSelected }) {
  const [showChapterSelect, setShowChapterSelect] = React.useState(false);

  const onClose = () => {
    setShowChapterSelect(false);
  };
  const { t } = useTranslation();

  return (
    <>
      <Button
        style={{ marginLeft: '10px' }}
        variant="contained"
        color="secondary"
        onClick={() => setShowChapterSelect(!showChapterSelect)}
      >
        {referenceSelected.chapter} {t('Ch.1')}
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
