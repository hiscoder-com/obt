import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { SettingsItem } from '.';
import { AppContext } from '../../context';
import { useStyles } from '../Settings/style';

function SwitchUniqueWords() {
  const {
    state: { switchTypeUniqueWords },
    actions: { setSwitchTypeUniqueWords },
  } = useContext(AppContext);
  const { t } = useTranslation();
  const classes = useStyles();
  const handleChange = (event) => {
    setSwitchTypeUniqueWords(event.target.value);
  };
  return (
    <SettingsItem title={t('Filter_unique_words_TWL')}>
      <FormControl component="fieldset">
        <RadioGroup
          className={classes.radioGroup}
          value={switchTypeUniqueWords}
          onChange={handleChange}
        >
          <FormControlLabel value="verse" control={<Radio />} label={t('By_verse')} />
          <FormControlLabel value="chapter" control={<Radio />} label={t('By_chapter')} />
          <FormControlLabel value="book" control={<Radio />} label={t('By_book')} />
          <FormControlLabel value="disabled" control={<Radio />} label="Disabled" />
        </RadioGroup>
      </FormControl>
    </SettingsItem>
  );
}

export default SwitchUniqueWords;
