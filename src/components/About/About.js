import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactMarkdown from 'react-markdown';

import changeLog from '../../CHANGELOG.md';
//TODO fix
// I cant import at ../../../CHANGELOG.md
// Module not found: You attempted to import ../../../CHANGELOG.md which falls outside of the project src/ directory. Relative imports outside of src/ are not supported.

import * as PACKAGE_JSON from '../../../package.json';

function About() {
  const [log, setLog] = React.useState();

  React.useEffect(() => {
    fetch(changeLog)
      .then((response) => response.text())
      .then((text) => {
        setLog({ text: text });
      });
  }, []);
  console.log(log);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{`v${PACKAGE_JSON?.default?.version}`}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'About'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ReactMarkdown>{log ? log.text : 'Version of application'}</ReactMarkdown>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default About;
