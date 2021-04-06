import React from 'react';

import { useTranslation } from 'react-i18next';
import { FormControl, NativeSelect } from '@material-ui/core';
import useStyles from './style';

export default function SelectLanguage() {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const localValueLanguage = localStorage.getItem('i18nextLng');
  function handleChange(event) {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <div>
      <FormControl>
        <NativeSelect
          classes={{
            root: classes.root,
            icon: classes.icon,
          }}
          onChange={handleChange}
          defaultValue={localValueLanguage ? localValueLanguage : 'ru'}
        >
          <option className={classes.option} value={'en'}>
            Eng
          </option>
          <option className={classes.option} value={'ru'}>
            Рус
          </option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}
