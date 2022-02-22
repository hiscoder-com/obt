import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import { Checkbox, FormControlLabel } from '@material-ui/core';

function SwitchChunks() {
  const { t } = useTranslation();
  const {
    state: { switchChunks },
    actions: { setSwitchChunks },
  } = useContext(AppContext);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={switchChunks}
          onChange={(e) => {
            setSwitchChunks((prev) => !prev);
          }}
        />
      }
      label={t('SwitchChunks')}
    />
  );
}

export default SwitchChunks;
