import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { SettingsItem } from '.';
import { AppContext } from '../../context';
import { useStyles } from '../Settings/style';

function SwitchUniqueWords() {
  const {
    state: { switchTypeUniqueWords, switchHideRepeatedWords },
    actions: { setSwitchTypeUniqueWords, setSwitchHideRepeatedWords },
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
          <FormControlLabel value="disabled" control={<Radio />} label={t('Disabled')} />
        </RadioGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={switchHideRepeatedWords}
              onChange={(e) => {
                setSwitchHideRepeatedWords((prev) => !prev);
              }}
              disabled={switchTypeUniqueWords === 'disabled'}
            />
          }
          label={t('Hide_repeated_words')}
        />
      </FormControl>
    </SettingsItem>
  );
}

export default SwitchUniqueWords;
