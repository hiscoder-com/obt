import { Typography, TextareaAutosize, Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { DialogUI } from '..';

function FeedbackDialog({ handleCloseDialog, openFeedbackDialog }) {
  const [text, setText] = useState('');
  const description = (
    <Typography>
      Если вы хотите, чтобы ваше ресурс отображался здесь, свяжитесь с нами. У вас есть
      несколько вариантов:
    </Typography>
  );

  const list = (
    <Typography>
      <ul>
        <li>
          Дискорд -
          <a href="https://discord.com/channels/867746700390563850/894978969613520956">
            https://discord.com/channels/867746700390563850/894978969613520956
          </a>
        </li>
        <li>E-mail - </li>
        <li>Телеграм - </li>
      </ul>
    </Typography>
  );
  const handleSend = () => {
    axios
      .post(
        'https://api.telegram.org/5213647019:AAF6fOBAkDTrKsMAu4fAmYyVR2d-zzRM62Y/getMe',
        {
          text: text,
        }
      )
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  return (
    <DialogUI title={' '} onClose={handleCloseDialog} open={openFeedbackDialog}>
      {description}
      {list}
      <TextareaAutosize
        aria-label="minimum height"
        minRows={6}
        onBlur={(e) => setText(e.target.value)}
      />
      {text && text}
      <Button onClick={handleSend}> Отправить</Button>
    </DialogUI>
  );
}

export default FeedbackDialog;
