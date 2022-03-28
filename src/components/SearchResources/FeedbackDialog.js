import { Typography } from '@material-ui/core';
import React from 'react';
import { DialogUI } from '..';

function FeedbackDialog({ handleCloseDialog, openFeedbackDialog }) {
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
  return (
    <DialogUI title={' '} onClose={handleCloseDialog} open={openFeedbackDialog}>
      {description}
      {list}
    </DialogUI>
  );
}

export default FeedbackDialog;
