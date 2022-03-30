import { TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { DialogUI } from '../../components';
import { useTranslation } from 'react-i18next';
import { useStyles } from './style';
import { useSnackbar } from 'notistack';

function FeedbackDialog({ handleCloseDialog, openFeedbackDialog, title }) {
  const [sendInfo, setSendInfo] = useState(null);
  const [openFinalDialog, setOpenFinalDialog] = useState(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const resetSendInfo = () => {
    setSendInfo(null);
  };
  const handleSend = () => {
    if (!sendInfo) {
      enqueueSnackbar(t('Не все поля заполнены'), { variant: 'warning' });
      return false;
    }
    if (sendInfo) {
      if (Object.values(sendInfo).length < 3) {
        enqueueSnackbar(t('Не все поля заполнены'), { variant: 'warning' });
        return false;
      }
      axios
        .get(
          `https://api.telegram.org/bot${process.env.REACT_APP_API_TELEGRAM_TOKEN}/sendMessage?text= ${sendInfo?.name} ${sendInfo?.email} ${sendInfo?.message}&chat_id=${process.env.REACT_APP_BOT_TELEGRAM}`
        )
        .then((result) => {
          handleCloseDialog();
          setOpenFinalDialog(true);
          resetSendInfo();
        })
        .catch((error) => {
          handleCloseDialog();
          setOpenFinalDialog(true);
          resetSendInfo();
          console.log(error);
        });
    }
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
      console.log(key);
      return { ...prev, [key]: value };
    });
  };

  // -755912039
  // <a href="https://discord.com/channels/867746700390563850/894978969613520956">
  //   https://discord.com/channels/867746700390563850/894978969613520956
  // </a>;
  return (
    <>
      <DialogUI
        primary={{ text: t('Send_message'), onClick: handleSend }}
        title={title}
        onClose={handleCloseDialog}
        open={openFeedbackDialog}
      >
        <div className={classes.container}>
          <TextField
            placeholder={'Name'}
            className={classes.nameTextfield}
            minRows={1}
            onBlur={(e) => handleSetInfo(e, 'name')}
            variant={'outlined'}
          />
          <TextField
            placeholder={'Email'}
            className={classes.emailTextfield}
            minRows={1}
            onBlur={(e) => handleSetInfo(e, 'email')}
            variant={'outlined'}
          />
          <TextField
            placeholder={'Message'}
            className={classes.textfield}
            minRows={6}
            onBlur={(e) => handleSetInfo(e, 'message')}
            multiline
            variant={'outlined'}
          />
        </div>
      </DialogUI>
      <DialogUI
        primary={{ text: t('Close'), onClick: handleCloseFinalDialog }}
        title={'Спасибо за ваше сообщение.'}
        onClose={handleCloseFinalDialog}
        open={openFinalDialog}
      ></DialogUI>
    </>
  );
}

export default FeedbackDialog;
