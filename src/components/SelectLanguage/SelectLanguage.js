import React from 'react';

import { useTranslation } from 'react-i18next';

import { FormControl, NativeSelect } from '@material-ui/core';
import { useStyles, useSelectStyles } from './style';

export default function SelectLanguage() {
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  const { i18n } = useTranslation();

  const localValueLanguage = localStorage.getItem('i18nextLng')
    ? localStorage.getItem('i18nextLng')
    : 'ru';

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        disableUnderline={true}
        variant="outlined"
        classes={{
          root: classes.root,
          icon: classes.icon,
        }}
        onChange={handleChange}
        defaultValue={localValueLanguage ? localValueLanguage : 'ru'}
      >
        <option className={classes.option} value={'en'}>
          English
        </option>
        <option className={classes.option} value={'ru'}>
          Русский
        </option>
      </NativeSelect>
    </FormControl>
  );
}
