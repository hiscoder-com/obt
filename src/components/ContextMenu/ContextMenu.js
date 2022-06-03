import React, { useContext, useMemo } from 'react';

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

  const groupReferenceToRange = (array) => {
    if (array.length < 1) {
      return;
    }
    if (array.length === 1) {
      return array;
    }
    const newArray = [];
    let startRange = 0;
    let finishRange = 0;
    let text = '';
    for (let i = 0; i < array.length - 1; i++) {
      if (parseInt(array[i].verse) !== parseInt(array[i + 1].verse) - 1) {
        if (startRange === 0) {
          newArray.push(array[i]);
        } else {
          finishRange = parseInt(array[i].verse);
          text += array[i].text.trim();
          newArray.push({
            bookId: array[i].bookId,
            chapter: array[i].chapter,
            verse: `${startRange}-${finishRange}`,
            text: text,
            resource: array[i].resource,
          });
          startRange = 0;
          finishRange = 0;
          text = '';
        }
      } else {
        if (startRange === 0) {
          startRange = parseInt(array[i].verse);
          text = array[i].text.trim();
        } else {
          text += array[i].text.trim() + ' ';
        }

        if (finishRange !== 0) {
          newArray.push({
            bookId: array[i].bookId,
            chapter: array[i].chapter,
            verse: `${startRange}-${finishRange}`,
            text: text,
            resource: array[i].resource,
          });
          startRange = 0;
          finishRange = 0;
        }
      }
    }
    if (startRange === 0) {
      newArray.push(array[array.length - 1]);
    } else {
      finishRange = parseInt(array[array.length - 1].verse);
      text += array[array.length - 1].text.trim();
      newArray.push({
        bookId: array[array.length - 1].bookId,
        chapter: array[array.length - 1].chapter,
        verse: `${startRange}-${finishRange}`,
        text: text,
        resource: [array.length - 1].resource,
      });
    }
    return newArray;
  };
  const rangeReferenceBlock = useMemo(
    () => groupReferenceToRange(referenceBlock),
    [referenceBlock]
  );

  const handleReferenceToClipboard = () => {
    if (!rangeReferenceBlock || rangeReferenceBlock.length < 1) {
      enqueueSnackbar(t('Copied_error'), { variant: 'error' });
      return;
    }
    let text = `${t(rangeReferenceBlock[0].bookId)} ${rangeReferenceBlock[0].chapter}:`;
    rangeReferenceBlock.forEach((el) => {
      text += el.verse + ',';
    });
    copyToClipboard(text.slice(0, -1));
  };

  const handleVerseToClipboard = () => {
    if (!rangeReferenceBlock || rangeReferenceBlock.length < 1) {
      enqueueSnackbar(t('Copied_error'), { variant: 'error' });
      return;
    }
    let text = '';
    let head = `${t(rangeReferenceBlock[0].bookId)} ${rangeReferenceBlock[0].chapter}\n`;
    rangeReferenceBlock.forEach((el) => {
      text += `${el.verse} ${el.text.trim()} \n`;
    });
    copyToClipboard(text + '\n' + head);
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
      <MenuItem onClick={handleSelectVerses}>
        {selectVerses ? t('Deselect') : t('Select_verses')}
      </MenuItem>
    </Menu>
  );
}

export default ContextMenu;
