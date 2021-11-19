import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { DialogUI } from '../../components';
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
        primary={{
          text: t('Send_message'),
          onClick: handleSend,
          disabled: valueComment === '' || referenceBlock?.text === '',
        }}
        maxWidth={'sm'}
        open={open}
        onClose={handleCancel}
        classes={{
          root: { paper: 'intro-reportDialog' },
        }}
        title={t('Report_typo')}
      >
        <DialogContentText>{t('Text_to_editors')}</DialogContentText>
        <DialogContentText>
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
