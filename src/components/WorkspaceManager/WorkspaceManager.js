import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext, ReferenceContext } from '../../context';

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
    state: {
      referenceSelected: { bookId },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const { t } = useTranslation();

  const workspaceType = bookId === 'obs' ? 'obs' : 'bible';
  const handleReset = () => {
    const oldAppConfig = JSON.parse(localStorage.getItem('appConfig'));
    switch (workspaceType) {
      case 'bible':
        const bibleAppConfig = {
          ...oldAppConfig,
          [workspaceType]: defaultTplBible[currentLanguage],
        };
        localStorage.setItem('appConfig', JSON.stringify(bibleAppConfig));
        setAppConfig(defaultTplBible[currentLanguage]);
        goToBookChapterVerse(
          defaultBibleReference[currentLanguage].bookId,
          defaultBibleReference[currentLanguage].chapter,
          defaultBibleReference[currentLanguage].verse
        );
        break;

      case 'obs':
        const obsAppConfig = {
          ...oldAppConfig,
          [workspaceType]: defaultTplOBS[currentLanguage],
        };
        localStorage.setItem('appConfig', JSON.stringify(obsAppConfig));
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
      <MenuItem divider={true} onClick={handleReset}>
        {t('Reset')}
      </MenuItem>
    </MenuList>
  );
}

export default WorkspaceManager;
