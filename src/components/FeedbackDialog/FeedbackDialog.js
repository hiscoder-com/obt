import { TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { DialogUI } from '../../components';
import { useTranslation } from 'react-i18next';
import { useStyles } from './style';

function FeedbackDialog({ handleCloseDialog, openFeedbackDialog, title }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [openFinalDialog, setOpenFinalDialog] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();
  console.log(openFeedbackDialog);
  const handleSend = () => {
    if (name)
      axios
        .get(
          `https://api.telegram.org/bot${process.env.REACT_APP_API_TELEGRAM_TOKEN}/sendMessage?text= ${name} ${email} ${text}&chat_id=${process.env.REACT_APP_BOT_TELEGRAM}`
        )
        .then((result) => {
          handleCloseDialog();
          setOpenFinalDialog(true);
          setEmail('');
          setName('');
          setText('');
        })
        .catch((error) => {
          handleCloseDialog();
          setOpenFinalDialog(true);
          setEmail('');
          setName('');
          setText('');
          console.log(error);
        });
  };
  const handleCloseFinalDialog = () => {
    setOpenFinalDialog(false);
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
            aria-label="minimum height"
            minRows={1}
            onBlur={(e) => setName(e.target.value.trim())}
            variant={'outlined'}
          />
          <TextField
            placeholder={'Email'}
            className={classes.emailTextfield}
            aria-label="minimum height"
            minRows={1}
            onBlur={(e) => setEmail(e.target.value.trim())}
            variant={'outlined'}
          />
          <TextField
            placeholder={'Message'}
            className={classes.textfield}
            aria-label="minimum height"
            minRows={6}
            onBlur={(e) => setText(e.target.value.trim())}
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
