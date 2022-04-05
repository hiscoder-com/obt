import React, { useContext } from 'react';

import { Button, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext, ReferenceContext } from '../../context';

import { resetWorkspace } from '../../helper';

function WorkspaceManager({ onClose }) {
  const {
    state: { currentLanguage },
    actions: { setAppConfig, setLanguageResources },
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
      setLanguageResources,
      goToBookChapterVerse,
      currentLanguage,
      resetAll: false,
    });

    onClose();
  };

  return (
    <MenuItem button={false} divider={true}>
      <Button
        onClick={handleReset}
        variant="contained"
        color="default"
        size="small"
        fullWidth
      >
        {t('Reset_cards')}
      </Button>
    </MenuItem>
  );
}

export default WorkspaceManager;
