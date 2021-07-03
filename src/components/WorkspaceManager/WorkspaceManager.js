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

function WorkspaceManager() {
  const {
    actions: { setReferenceSelected, setAppConfig },
  } = useContext(AppContext);
  const { t } = useTranslation();

  const handleResetToBible = () => {
    setAppConfig(defaultTplBible);
    setReferenceSelected(defaultBibleReference);
  };

  const handleResetToOBS = () => {
    setAppConfig(defaultTplOBS);
    setReferenceSelected(defaultOBSReference);
  };

  return (
    <MenuList>
      <MenuItem onClick={handleResetToBible}>{t('Open_Bible')}</MenuItem>
      <MenuItem onClick={handleResetToOBS}>{t('Open_OBS')}</MenuItem>
    </MenuList>
  );
}

export default WorkspaceManager;
