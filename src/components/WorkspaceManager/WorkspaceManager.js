import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';

import {
  defaultTplBible,
  defaultTplOBS,
  defaultBibleReference,
  defaultOBSReference,
} from '../../config/base';
import { MenuItem, MenuList } from '@material-ui/core';

function WorkspaceManager({ onClose }) {
  const {
    state: { referenceSelected },
    actions: { setReferenceSelected, setAppConfig },
  } = useContext(AppContext);
  const { t } = useTranslation();

  const handleResetToBible = () => {
    setAppConfig(defaultTplBible);
    if (referenceSelected.bookId === 'obs') {
      setReferenceSelected(defaultBibleReference);
    }
    onClose();
  };

  const handleResetToOBS = () => {
    setAppConfig(defaultTplOBS);
    if (referenceSelected.bookId !== 'obs') {
      setReferenceSelected(defaultOBSReference);
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
