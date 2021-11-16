import React, { useState, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';

import changeLog from '../../docs/CHANGELOG.md';
import * as PACKAGE_JSON from '../../../package.json';
import DialogUI from '../DialogUI/DialogUI';
import { DialogContentText, MenuList, MenuItem } from '@material-ui/core';

function About({ open, setOpen, handleClick }) {
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
    ? `v${PACKAGE_JSON?.default?.version}`
    : `Information about application`;

  return (
    <>
      <MenuList>
        <MenuItem onClick={handleClick}>
          <div>{textLabel}</div>
        </MenuItem>
      </MenuList>
      <DialogUI
        open={open}
        onClose={handleClose}
        title={{
          text: `About v${PACKAGE_JSON?.default?.version}`,
          titleDialogClose: true,
        }}
      >
        <DialogContentText id="about-text">
          {PACKAGE_JSON?.default?.description}
          <ReactMarkdown>{log ? log.text : 'Version of application'}</ReactMarkdown>
        </DialogContentText>
      </DialogUI>
    </>
  );
}

export default About;
