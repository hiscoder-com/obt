import React, { useContext } from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';

function SwitchExtraTitleCard() {
  const { t } = useTranslation();
  const {
    state: { switchExtraTitleCard },
    actions: { setSwitchExtraTitleCard },
  } = useContext(AppContext);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={switchExtraTitleCard}
          onChange={(e) => {
            setSwitchExtraTitleCard((prev) => !prev);
          }}
        />
      }
      label={t('Switch_extra_title_card')}
    />
  );
}

export default SwitchExtraTitleCard;
