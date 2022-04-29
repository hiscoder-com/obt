import React, { useContext, useEffect } from 'react';

import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context/AppContext';

import { languages } from '../../config/base';

import { useStyles } from './style';

export default function SelectLanguage({ label, style }) {
  const {
    state: { currentLanguage },
    actions: { setCurrentLanguage, setLanguageResources },
  } = useContext(AppContext);
  const classes = useStyles();

  const { i18n, t } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setCurrentLanguage(e.target.value);
  };
  useEffect(() => {
    setLanguageResources((prev) => {
      const new_val = cloneDeep(prev);
      if (!new_val.includes(currentLanguage)) {
        new_val.push(currentLanguage);
      }
      return new_val;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);
  return (
    <FormControl className={classes.formControl} style={style}>
      {label && <InputLabel id="lang-select-label">{label}</InputLabel>}
      <Select
        labelid="lang-select-label"
        disableUnderline={true}
        classes={{
          root: classes.root,
          icon: classes.icon,
        }}
        onChange={handleChange}
        value={currentLanguage}
      >
        {languages.map((el) => (
          <MenuItem key={el} className={classes.option} value={el}>
            {t(el)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
