import React, { useContext, useState } from 'react';

import { SendError } from 'tsv-frontend';
import { AppContext } from '../../App.context';

import FinishDialog from './FinishDialog';
import ReportDialog from './ReportDialog';

import { Backdrop, CircularProgress } from '@material-ui/core';

import useStyles from './style';

export default function TypoReport() {
  const { state, actions } = useContext(AppContext);
  const { showErrorReport, referenceBlock } = state;
  const { setShowErrorReport } = actions;

  const [valueComment, setValueComment] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);

  const handleChange = (e) => {
    setValueComment(e.target.value);
  };
  const handleClickOpenFinishDialog = () => {
    setOpenFinishDialog(true);
  };

  const handleCloseFinishDialog = () => {
    setOpenFinishDialog(false);
  };

  const handleSend = () => {
    setOpenBackdrop(!openBackdrop);
    setShowErrorReport(false);
    SendError({
      reference: referenceBlock.chapter + ':' + referenceBlock.verse,
      bookId: referenceBlock.bookId,
      resource: referenceBlock.type,
      serverLink: 'http://localhost:4000/send',
      fields: {
        Note: valueComment,
        Quote: referenceBlock.text,
      },
    })
      .then((res) => {
        console.log(res);
        setValueComment('');
        setOpenFinishDialog(true);
        setOpenBackdrop(false);
      })
      .catch((err) => {
        console.log('err', err);
        setValueComment('');
        setOpenBackdrop(false);
      });
  };

  function handleCancel() {
    setShowErrorReport(false);
  }
  const classes = useStyles();

  return (
    <>
      <ReportDialog
        open={showErrorReport}
        valueComment={valueComment}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSend={handleSend}
      />
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <FinishDialog isOpen={openFinishDialog} onClose={handleCloseFinishDialog} />
    </>
  );
}
