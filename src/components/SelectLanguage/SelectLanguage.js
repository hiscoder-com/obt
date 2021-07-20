import React from 'react';

import { useTranslation } from 'react-i18next';

import { languages } from '../../config/base';

import { FormControl, NativeSelect, InputLabel } from '@material-ui/core';
import { useStyles } from './style';

export default function SelectLanguage() {
  const classes = useStyles();

  const { i18n, t } = useTranslation();

  const localValueLanguage = localStorage.getItem('i18nextLng')
    ? localStorage.getItem('i18nextLng')
    : languages[0];

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="lang-select-label">{t('Interface_lang')}</InputLabel>
      <NativeSelect
        labelId="lang-select-label"
        disableUnderline={true}
        variant="outlined"
        classes={{
          root: classes.root,
          icon: classes.icon,
        }}
        onChange={handleChange}
        defaultValue={localValueLanguage}
      >
        {languages.map((el) => (
          <option key={el} className={classes.option} value={el}>
            {t(el)}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
