import React, { useContext } from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { AppContext, ReferenceContext } from '../../context';

const initialPosition = {
  left: null,
  top: null,
};

function ContextMenu({ position, setPosition, PopoverClasses }) {
  const { t } = useTranslation();
  const {
    actions: { setShowErrorReport },
    actions: { setShowBibleVerse },
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

  const handleOpenBibleVerse = () => {
    setShowBibleVerse(true);
    setPosition(initialPosition);
  };

  const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text).then(
      () => {
        handleContextClose();
        enqueueSnackbar(t('Copied_success'), { variant: 'success' });
      },
      (err) => {
        handleContextClose();
        enqueueSnackbar(t('Copied_error'), { variant: 'error' });
      }
    );
  };

  const handleReferenceToClipboard = () => {
    copyToClipboard(
      `${t(referenceBlock.bookId)} ${referenceBlock.chapter}:${referenceBlock.verse}`
    );
  };

  const handleVerseToClipboard = () => {
    copyToClipboard(
      `${referenceBlock.text} (${t(referenceBlock.bookId)} ${referenceBlock.chapter}:${
        referenceBlock.verse
      })`
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
      <MenuItem onClick={handleOpenBibleVerse}>{t('Create a picture')}</MenuItem>
      <MenuItem onClick={handleVerseToClipboard}>{t('Copy_verse_to_clipboard')}</MenuItem>
      <MenuItem onClick={handleReferenceToClipboard}>
        {t('Copy_reference_to_clipboard')}
      </MenuItem>
    </Menu>
  );
}

export default ContextMenu;
