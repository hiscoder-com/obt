import React from 'react';

import { useTranslation } from 'react-i18next';

import logo from './friends.png';

import { Button, Dialog, DialogActions, DialogContent, Link } from '@material-ui/core';

import useStyles from './style';

function FinishDialog({ open, onClose }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.center}>
        <div>
          <img alt="logo friends" src={logo} />
        </div>
        {t('Thanks_report1')} <br />
        {t('Thanks_report2')} <br /> <br />
        {t('See_logs1')} <br />
        <Link href="https://git.door43.org/BSA/errors" target="_blank">
          {t('See_logs2')}
        </Link>
      </DialogContent>
      <DialogActions className={classes.secondActions}>
        <Button onClick={onClose} variant="contained" color="primary">
          {t('Close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinishDialog;
