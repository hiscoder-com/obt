import React from 'react';

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

import ReactMarkdown from 'react-markdown';

import changeLog from '../../docs/CHANGELOG.md';

import * as PACKAGE_JSON from '../../../package.json';

function About({ open, setOpen, handleClick }) {
  const [log, setLog] = React.useState();
  console.log(log);
  React.useEffect(() => {
    fetch(changeLog)
      .then((response) => response.text())
      .then((text) => {
        setLog({ text: text });
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuList>
        <MenuItem onClick={handleClick}>
          <div>{`${PACKAGE_JSON?.default?.name.toUpperCase()} v${
            PACKAGE_JSON?.default?.version
          }`}</div>
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
            } \n\
            ${PACKAGE_JSON?.default?.description}`}

            <ReactMarkdown>{log ? log.text : 'Version of application'}</ReactMarkdown>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default About;
