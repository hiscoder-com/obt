import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { SettingsItem } from '.';
import { AppContext } from '../../context';

function SwitchUniqueWords() {
  const {
    state: { switchTypeUniqueWords },
    actions: { setSwitchTypeUniqueWords },
  } = useContext(AppContext);
  const { t } = useTranslation();

  const handleChange = (event) => {
    setSwitchTypeUniqueWords(event.target.value);
  };
  return (
    <SettingsItem title={t('Unique_words_label')}>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">Gender</FormLabel> */}
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={switchTypeUniqueWords}
          onChange={handleChange}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <FormControlLabel value="verse" control={<Radio />} label="Verse" />
          <FormControlLabel value="chapter" control={<Radio />} label="Chapter" />
          <FormControlLabel value="book" control={<Radio />} label="Book" />
          <FormControlLabel value="disabled" control={<Radio />} label="Disabled" />
        </RadioGroup>
      </FormControl>
    </SettingsItem>
  );
}

export default SwitchUniqueWords;
