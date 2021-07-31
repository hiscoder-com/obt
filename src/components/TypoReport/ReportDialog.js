import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { ReferenceContext } from '../../ReferenceContext';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';
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

  const showReference = `${referenceBlock?.resource}/${referenceBlock?.bookId}/${referenceBlock?.chapter}/${referenceBlock?.verse}`;

  const showReferenceText = referenceBlock?.text;

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle className={classes.title}>{t('Report_typo')}</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          onClick={handleCancel}
          variant="contained"
          color="primary"
          className={classes.cancel}
        >
          {t('Cancel')}
        </Button>
        <Button
          disabled={valueComment === '' || referenceBlock?.text === ''}
          onClick={handleSend}
          variant="contained"
          color="secondary"
          className={classes.send}
        >
          {t('Send_message')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReportDialog;
