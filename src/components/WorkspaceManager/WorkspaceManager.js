import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';
import { ReferenceContext } from '../../ReferenceContext';

import {
  defaultTplBible,
  defaultTplOBS,
  defaultBibleReference,
  defaultOBSReference,
} from '../../config/base';
import { MenuItem, MenuList } from '@material-ui/core';

function WorkspaceManager({ onClose }) {
  const {
    state: { currentLanguage },
    actions: { setAppConfig },
  } = useContext(AppContext);

  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const { t } = useTranslation();

  const handleResetToBible = () => {
    setAppConfig(defaultTplBible[currentLanguage]);
    if (referenceSelected.bookId === 'obs') {
      goToBookChapterVerse(defaultBibleReference[currentLanguage]);
    }
    onClose();
  };

  const handleResetToOBS = () => {
    setAppConfig(defaultTplOBS[currentLanguage]);
    if (referenceSelected.bookId !== 'obs') {
      goToBookChapterVerse(defaultOBSReference[currentLanguage]);
    }
    onClose();
  };

  return (
    <MenuList>
      <MenuItem onClick={handleResetToBible}>{t('Open_Bible')}</MenuItem>
      <MenuItem onClick={handleResetToOBS}>{t('Open_OBS')}</MenuItem>
    </MenuList>
  );
}

export default WorkspaceManager;
