import React, { useContext } from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';
import { SettingsItem } from '.';

function SwitchWordPopover() {
  const { t } = useTranslation();
  const {
    state: { switchWordPopover },
    actions: { setSwitchWordPopover },
  } = useContext(AppContext);

  return (
    <SettingsItem title={t('Word_popover_label')}>
      <FormControlLabel
        control={
          <Checkbox
            checked={!switchWordPopover}
            onChange={(e) => {
              setSwitchWordPopover((prev) => !prev);
            }}
          />
        }
        label={t('Switch_word_popover')}
      />
    </SettingsItem>
  );
}

export default SwitchWordPopover;
