import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context/AppContext';
import DialogUI from '../DialogUI/DialogUI';
import logo from './friends.png';
import { Link } from '@material-ui/core';
import useStyles from './style';

function FinishDialog({ open, onClose }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    state: { errorFile },
  } = useContext(AppContext);

  return (
    <DialogUI
      classes={{ actions: classes.secondActions, content: classes.center }}
      buttons={[
        {
          label: t('Apply'),
          variant: 'contained',
          color: 'primary',
          onClick: onClose,
        },
      ]}
      open={open}
    >
      <div>
        <img alt="logo friends" src={logo} />
      </div>
      {t('Thanks_report1')} <br />
      {t('Thanks_report2')} <br /> <br />
      {t('See_logs1')} <br />
      <Link href={errorFile} target="_blank">
        {t('See_logs2')}
      </Link>
    </DialogUI>
  );
}

export default FinishDialog;
