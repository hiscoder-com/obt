import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { FormControl, Link, TextField, Typography } from '@material-ui/core';
import { DialogUI } from '../../components';
import { useStyles } from './style';

function FeedbackDialog({ handleCloseDialog, openFeedbackDialog, title }) {
  const [sendInfo, setSendInfo] = useState(null);
  const [openFinalDialog, setOpenFinalDialog] = useState(false);
  const [status, setStatus] = useState('error');
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const resetSendInfo = () => {
    setSendInfo(null);
  };

  const handleSend = () => {
    if (!sendInfo) {
      enqueueSnackbar(t('Not_all_fields_filled'), { variant: 'warning' });
      return false;
    }

    if (Object.values(sendInfo).length < 3) {
      enqueueSnackbar(t('Not_all_fields_filled'), { variant: 'warning' });
      return false;
    }
    axios
      .post('/.netlify/functions/sendFeedback', JSON.stringify(sendInfo))
      .then((request) => {
        handleOpenFinalDialog(request.data.status);
      })
      .catch((err) => {
        console.log(err);
        handleOpenFinalDialog('error');
      });
  };
  const handleOpenFinalDialog = (status) => {
    setStatus(status);
    handleCloseDialog();
    setOpenFinalDialog(true);
    resetSendInfo();
  };
  const handleCloseFinalDialog = () => {
    setOpenFinalDialog(false);
  };
  const handleSetInfo = (e, key) => {
    const value = e.target.value.trim();
    if (value === '') {
      return false;
    }
    setSendInfo((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const textFieldValues = [
    {
      key: 'Name',
    },
    {
      key: 'Email',
    },
    {
      key: 'Message',
      className: 'textfield',
      minRows: 6,
      multiline: true,
    },
  ];
  const textFields = textFieldValues.map((el) => {
    const key = el.key.toLowerCase();
    return (
      <TextField
        key={key}
        placeholder={el.key}
        className={el.className ? classes.textfield : classes.nameTextfield}
        minRows={el.minRows ? el.minRows : 1}
        onBlur={(e) => handleSetInfo(e, key)}
        variant={'outlined'}
        multiline={el.multiline}
      />
    );
  });

  return (
    <>
      <DialogUI
        primary={{ text: t('Send_message'), onClick: handleSend }}
        title={title}
        onClose={handleCloseDialog}
        open={openFeedbackDialog}
      >
        <FormControl className={classes.container}>{textFields}</FormControl>
      </DialogUI>
      <DialogUI
        primary={{ text: t('Close'), onClick: handleCloseFinalDialog }}
        title={' '}
        onClose={handleCloseFinalDialog}
        open={openFinalDialog}
        maxWidth="sm"
      >
        <Typography variant={'h6'}>
          {status === 'error' ? (
            <>
              <p>{t('Message_not_send')}</p>
              <p>{t('Write_us')}:</p>
              <Link
                className={classes.link}
                target="_blank"
                href="https://discord.gg/AmFFGVBnj6"
              >
                Discord
              </Link>
            </>
          ) : (
            t('Thanks_report1')
          )}
        </Typography>
      </DialogUI>
    </>
  );
}

export default FeedbackDialog;
