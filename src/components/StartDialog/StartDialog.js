import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectLanguage } from '../../components/';
import { AppContext, ReferenceContext } from '../../context';

import { resetWorkspace } from '../../helper';
import {
  defaultTplBible,
  defaultTplOBS,
  defaultBibleReference,
  defaultOBSReference,
} from '../../config/base';
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
    actions: { setOpenStartDialog, setLoadIntro, currentLanguage },
    state: { openStartDialog, setAppConfig },
  } = useContext(AppContext);
  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const workspaceType = bookId === 'obs' ? 'obs' : 'bible';
  const handleClose = () => {
    setOpenStartDialog(false);
    resetWorkspace(
      workspaceType,
      defaultBibleReference,
      defaultOBSReference,
      defaultTplBible,
      defaultTplOBS,
      setAppConfig,
      goToBookChapterVerse,
      currentLanguage
    );
    setLoadIntro(true);
  };
  return (
    <Dialog open={openStartDialog} /**onClose={handleClose}*/>
      <DialogTitle id="about-title">{t('Choose_language')}</DialogTitle>
      <DialogContent>
        <SelectLanguage />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color={'primary'}>
          {t('Close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StartDialog;
