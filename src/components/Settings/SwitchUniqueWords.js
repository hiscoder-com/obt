import React, { useContext } from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';
import { SettingsItem } from '.';

function SwitchUniqueWords() {
  const { t } = useTranslation();
  const {
    state: { switchUniqueWords },
    actions: { setSwitchUniqueWords },
  } = useContext(AppContext);
  return (
    <SettingsItem title={t('Unique_words_label')}>
      <FormControlLabel
        control={
          <Checkbox
            checked={switchUniqueWords}
            onChange={(e) => {
              setSwitchUniqueWords((prev) => !prev);
            }}
          />
        }
        label={t('Switch_unique_words')}
      />
    </SettingsItem>
  );
}

export default SwitchUniqueWords;
