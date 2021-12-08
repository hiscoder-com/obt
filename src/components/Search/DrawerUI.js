import * as React from 'react';

import { Drawer, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useLocalTitleStyles from './style';
export default function DrawerUI({ open, onClose, children }) {
  const classesLocalTitle = useLocalTitleStyles();
  return (
    <div>
      <Drawer variant={'persistent'} anchor={'bottom'} open={open} onClose={onClose}>
        <IconButton
          aria-label="close"
          className={classesLocalTitle.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <div style={{ marginLeft: '50px', padding: '10px' }}>{children}</div>
      </Drawer>
    </div>
  );
}
