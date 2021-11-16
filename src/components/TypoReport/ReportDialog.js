import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import DialogUI from '../DialogUI/DialogUI';
import { ReferenceContext } from '../../context';

import { Box, DialogContentText, TextField } from '@material-ui/core';
import useStyles from './style';

function ReportDialog({
  open,
  valueComment,
  handleChange,
  handleCancel,
  handleSend,
  errorMessage,
}) {
  const {
    state: { referenceBlock },
  } = useContext(ReferenceContext);

  const { t } = useTranslation();
  const classes = useStyles();

  const { bookId, chapter, verse, resource, text } = referenceBlock;

  const showReference = `${resource}/${bookId}/${chapter}/${verse}`;

  const showReferenceText = text;

  return (
    <>
      <DialogUI
        buttons={[
          {
            label: t('Cancel'),
            variant: 'contained',
            color: 'primary',
            classesButton: classes.cancel,
            onClick: handleCancel,
          },
          {
            label: t('Send_message'),
            variant: 'contained',
            color: 'secondary',
            classesButton: classes.send,
            onClick: handleSend,
            disabled: valueComment === '' || referenceBlock?.text === '',
          },
        ]}
        open={open}
        onClose={handleCancel}
        classes={{ root: { paper: 'intro-reportDialog' }, actions: classes.actions }}
        title={{ text: t('Report_typo'), classesTitle: classes.title }}
      >
        <DialogContentText>{t('Text_to_editors')}</DialogContentText>
        <DialogContentText className={classes.select}>
          {showReferenceText}
          <Box component="span" className={classes.ref}>
            ({showReference})
          </Box>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label={t('Your_comment')}
          type="text"
          value={valueComment}
          onChange={handleChange}
          fullWidth
        />
        <DialogContentText className={classes.errorMessage}>
          {errorMessage}
        </DialogContentText>
      </DialogUI>
    </>
  );
}

export default ReportDialog;
