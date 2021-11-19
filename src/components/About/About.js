import React, { useState, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';

import changeLog from '../../docs/CHANGELOG.md';
import * as PACKAGE_JSON from '../../../package.json';
import { DialogUI } from '../../components';
import { MenuList, MenuItem } from '@material-ui/core';

function About({ open, setOpen, handleClick }) {
  const [log, setLog] = useState();

  useEffect(() => {
    fetch(changeLog)
      .then((response) => response.text())
      .then((text) => {
        setLog({ text: text });
      });
  }, []);

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
        maxWidth={'sm'}
        onClose={handleClose}
        title={`About v${PACKAGE_JSON?.default?.version}`}
      >
        {PACKAGE_JSON?.default?.description}
        <ReactMarkdown className={'md'}>
          {log ? log.text : 'Version of application'}
        </ReactMarkdown>
      </DialogUI>
    </>
  );
}

export default About;
