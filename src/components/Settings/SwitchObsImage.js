import React, { useContext } from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';
import { SettingsItem } from '.';

function SwitchObsImage() {
  const { t } = useTranslation();
  const {
    state: { switchObsImage },
    actions: { setSwitchObsImage },
  } = useContext(AppContext);

  return (
    <SettingsItem title={t('OBS_images')}>
      <FormControlLabel
        control={
          <Checkbox
            checked={switchObsImage}
            onChange={(e) => {
              setSwitchObsImage((prev) => !prev);
            }}
          />
        }
        label={t('Show_OBS_label')}
      />
    </SettingsItem>
  );
}

export default SwitchObsImage;
