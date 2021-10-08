import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext, ReferenceContext } from '../../context';

import {
  defaultTplBible,
  defaultTplOBS,
  defaultBibleReference,
  defaultOBSReference,
} from '../../config/base';
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
  const workspaceType = bookId === 'obs' ? 'obs' : 'bible';

  const handleReset = () => {
    resetWorkspace(
      workspaceType,
      defaultBibleReference,
      defaultOBSReference,
      defaultTplBible,
      defaultTplOBS,
      setAppConfig,
      goToBookChapterVerse,
      currentLanguage
    );
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
