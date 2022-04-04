import React, { useContext } from 'react';

import { Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';
import { DialogUI } from '../../components';

import logo from './friends.png';

import useStyles from './style';

function FinishDialog({ open, onClose }) {
  const { t } = useTranslation();
  const {
    state: { errorFile },
  } = useContext(AppContext);

  const classes = useStyles();

  return (
    <DialogUI
      primary={{ text: t('Ok'), onClick: onClose }}
      onClose={onClose}
      title={t('Done')}
      open={open}
    >
      <div className={classes.finishDialogContent}>
        <div>
          <img alt="logo friends" src={logo} />
        </div>
        {t('Thanks_report1')} <br />
        {t('Thanks_report2')} <br /> <br />
        {t('See_logs1')} <br />
        <Link href={errorFile} target="_blank">
          {t('See_logs2')}
        </Link>
      </div>
    </DialogUI>
  );
}

export default FinishDialog;
