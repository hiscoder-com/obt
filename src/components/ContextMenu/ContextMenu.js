import React, { useContext } from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { AppContext, ReferenceContext } from '../../context';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

const initialPosition = {
  left: null,
  top: null,
};

function ContextMenu({ position, setPosition, PopoverClasses }) {
  const { t } = useTranslation();
  const {
    actions: { setShowErrorReport },
  } = useContext(AppContext);

  const {
    state: { referenceBlock },
  } = useContext(ReferenceContext);

  const { enqueueSnackbar } = useSnackbar();

  const handleContextClose = () => {
    setPosition(initialPosition);
  };

  const anchorPosition =
    position?.top !== null && position?.left !== null
      ? { top: position.top, left: position.left }
      : undefined;

  const handleOpenError = () => {
    setShowErrorReport(true);
    setPosition(initialPosition);
  };

  const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text);
  };

  const handleToClipboard = () => {
    copyToClipboard(
      `${referenceBlock.text} (${t(referenceBlock.bookId)} ${referenceBlock.chapter}:${
        referenceBlock.verse
      })`
    ).then(
      () => {
        handleContextClose();
        enqueueSnackbar(t('copied_success'), { variant: 'success' });
      },
      (err) => {
        handleContextClose();
        enqueueSnackbar(t('copied_error'), { variant: 'error' });
      }
    );
  };

  return (
    <Menu
      keepMounted
      open={position.top !== null}
      onClose={handleContextClose}
      anchorPosition={anchorPosition}
      PopoverClasses={PopoverClasses}
      anchorReference="anchorPosition"
    >
      <MenuItem onClick={handleOpenError}>{t('Error_report')}</MenuItem>
      <MenuItem onClick={handleToClipboard}>{t('Copy_to_clipboard')}</MenuItem>
    </Menu>
  );
}

export default ContextMenu;
