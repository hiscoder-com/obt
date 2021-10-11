import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectLanguage } from '../../components/';
import { AppContext, ReferenceContext } from '../../context';

import { resetWorkspace } from '../../helper';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';

function StartDialog() {
  const { t } = useTranslation();
  const {
    actions: { setOpenStartDialog, setLoadIntro, setAppConfig },
    state: { openStartDialog, currentLanguage },
  } = useContext(AppContext);
  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const handleClose = () => {
    setOpenStartDialog(false);
    resetWorkspace({
      bookId,
      setAppConfig,
      goToBookChapterVerse,
      currentLanguage,
      resetAll: true,
    });
    setLoadIntro(true);
  };
  return (
    <Dialog open={openStartDialog}>
      <DialogTitle id="about-title">{t('Choose_language')}</DialogTitle>
      <DialogContent>
        <SelectLanguage />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color={'primary'}>
          {t('Apply')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StartDialog;
