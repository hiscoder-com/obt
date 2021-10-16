import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext, ReferenceContext } from '../../context';

import { resetWorkspace } from '../../helper';
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

  const handleReset = () => {
    resetWorkspace({
      bookId,
      setAppConfig,
      goToBookChapterVerse,
      currentLanguage,
      resetAll: false,
    });
    onClose();
  };

  return (
    <MenuList>
      <MenuItem divider={true} onClick={handleReset}>
        {t('Reset_cards')}
      </MenuItem>
    </MenuList>
  );
}

export default WorkspaceManager;
