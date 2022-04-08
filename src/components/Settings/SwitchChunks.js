import React, { useContext } from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';
import { SettingsItem } from '.';

function SwitchChunks() {
  const { t } = useTranslation();
  const {
    state: { switchChunks },
    actions: { setSwitchChunks },
  } = useContext(AppContext);

  return (
    <SettingsItem title={t('Chunks_label')}>
      <FormControlLabel
        control={
          <Checkbox
            checked={switchChunks}
            onChange={(e) => {
              setSwitchChunks((prev) => !prev);
            }}
          />
        }
        label={t('Switch_chunks')}
      />
    </SettingsItem>
  );
}

export default SwitchChunks;
