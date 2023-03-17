import React, { useContext } from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';
import { SettingsItem } from '.';

function SwitchMasterOnly() {
  const { t } = useTranslation();
  const {
    state: { switchMasterOnly },
    actions: { setSwitchMasterOnly },
  } = useContext(AppContext);

  return (
    <SettingsItem title={t('Master_only')}>
      <FormControlLabel
        control={
          <Checkbox
            checked={switchMasterOnly}
            onChange={() => {
              setSwitchMasterOnly((prev) => !prev);
            }}
          />
        }
        label={t('Show_master_only')}
      />
    </SettingsItem>
  );
}

export default SwitchMasterOnly;
