import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context/AppContext';
import { ReferenceContext } from '../../context/ReferenceContext';

import {
  defaultTplBible,
  defaultTplOBS,
  defaultBibleReference,
  defaultOBSReference,
} from '../../config/base';
import { MenuItem, MenuList } from '@material-ui/core';

function WorkspaceManager({ onClose }) {
  const {
    state: { currentLanguage, workspaceType },
    actions: { setAppConfig, setWorkspaceType },
  } = useContext(AppContext);

  const {
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const { t } = useTranslation();
  const { bookId, chapter, verse } = defaultBibleReference[currentLanguage];

  const handleOpenBible = () => {
    setWorkspaceType('bible');
    onClose();
  };

  const handleOpenOBS = () => {
    setWorkspaceType('obs');
    onClose();
  };

  const handleReset = () => {
    switch (workspaceType) {
      case 'bible':
        setAppConfig(defaultTplBible[currentLanguage]);
        goToBookChapterVerse(bookId, chapter, verse);
        break;

      case 'obs':
        setAppConfig(defaultTplOBS[currentLanguage]);
        goToBookChapterVerse(
          defaultOBSReference[currentLanguage].bookId,
          defaultOBSReference[currentLanguage].chapter,
          defaultOBSReference[currentLanguage].verse
        );
        break;

      default:
        break;
    }
    onClose();
  };

  return (
    <MenuList>
      <MenuItem onClick={handleOpenBible}>{t('Open_Bible')}</MenuItem>
      <MenuItem divider={true} onClick={handleOpenOBS}>
        {t('Open_OBS')}
      </MenuItem>
      <MenuItem divider={true} onClick={handleReset}>
        {t('Reset')}
      </MenuItem>
    </MenuList>
  );
}

export default WorkspaceManager;
