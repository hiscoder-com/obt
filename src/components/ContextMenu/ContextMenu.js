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
    state: { selectVerses },
    actions: { setShowErrorReport, setSelectVerses },
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
    let text1 = `${t(referenceBlock[0].bookId)} ${referenceBlock[0].chapter}:`;
    referenceBlock.forEach((el) => {
      text1 += el.verse + ',';
    });
    copyToClipboard(text1);
  };

  const handleVerseToClipboard = () => {
    let text = '';
    let text2 = `${t(referenceBlock[0].bookId)} ${referenceBlock[0].chapter}\n`;
    referenceBlock.forEach((el) => {
      text += `${el.text} (${t(el.bookId)} ${el.chapter}:${el.verse})\n`;
      text2 += `${el.verse} ${el.text} \n`;
    });
    copyToClipboard(text2);
  };

  const handleSelectVerses = () => {
    setSelectVerses((prev) => !prev);
    handleContextClose();
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
      <MenuItem onClick={handleVerseToClipboard}>{t('Copy_verse_to_clipboard')}</MenuItem>
      <MenuItem onClick={handleReferenceToClipboard}>
        {t('Copy_reference_to_clipboard')}
      </MenuItem>
      <MenuItem selected={selectVerses} onClick={handleSelectVerses}>
        {t('Select_verses')}
      </MenuItem>
    </Menu>
  );
}

export default ContextMenu;
