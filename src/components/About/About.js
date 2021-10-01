import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuList,
  MenuItem,
} from '@material-ui/core';

import changeLog from '../../docs/CHANGELOG.md';
import * as PACKAGE_JSON from '../../../package.json';

function About({ open, setOpen, handleClick }) {
  const { t } = useTranslation();
  const [log, setLog] = useState();

  useEffect(() => {
    fetch(changeLog)
      .then((response) => response.text())
      .then((text) => {
        setLog({ text: text });
      });
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const textLabel = PACKAGE_JSON
    ? `${PACKAGE_JSON?.default?.name.toUpperCase()} v${PACKAGE_JSON?.default?.version}`
    : `Information about application`;

  return (
    <>
      <MenuList>
        <MenuItem onClick={handleClick}>
          <div>{textLabel}</div>
        </MenuItem>
      </MenuList>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'About'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${PACKAGE_JSON?.default?.name.toUpperCase()} v ${
              PACKAGE_JSON?.default?.version
            }. 
            ${PACKAGE_JSON?.default?.description}`}

            <ReactMarkdown>{log ? log.text : 'Version of application'}</ReactMarkdown>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t('Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default About;
