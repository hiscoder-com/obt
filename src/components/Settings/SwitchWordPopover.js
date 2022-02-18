import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import { Checkbox, FormControlLabel } from '@material-ui/core';

function SwitchWordPopover() {
  const { t } = useTranslation();
  const {
    state: { switchWordPopover },
    actions: { setSwitchWordPopover },
  } = useContext(AppContext);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={!switchWordPopover}
          onChange={(e) => {
            setSwitchWordPopover((prev) => !prev);
          }}
        />
      }
      label={t('SwitchWordPopover')}
    />
  );
}

export default SwitchWordPopover;
