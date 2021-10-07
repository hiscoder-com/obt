import React from 'react';
import { useTranslation } from 'react-i18next';
import { SelectLanguage } from '../../components/';
import { AppContext } from '../../context';
import {
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

function StartDialog() {
  const { t } = useTranslation();
  const {
    actions: { setOpenStartDialog, setLoadIntro },
    state: { openStartDialog },
  } = React.useContext(AppContext);

  const handleClose = () => {
    setOpenStartDialog(false);
    setLoadIntro(true);
  };
  return (
    <Dialog open={openStartDialog} onClose={handleClose}>
      <DialogTitle id="about-title">{t('Choose_language')}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="about-text">{t('Choose_language')}</DialogContentText> */}
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
