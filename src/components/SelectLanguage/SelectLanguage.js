import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/AppContext';
import { languages } from '../../config/base';
import { FormControl, NativeSelect, InputLabel } from '@material-ui/core';
import { useStyles } from './style';

export default function SelectLanguage({ label }) {
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
      if (!prev.includes(currentLanguage)) {
        prev.push(currentLanguage);
      }
      console.log({ prev });
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);
  return (
    <FormControl className={classes.formControl}>
      {label && <InputLabel id="lang-select-label">{label}</InputLabel>}
      <NativeSelect
        labelid="lang-select-label"
        disableUnderline={true}
        variant="outlined"
        classes={{
          root: classes.root,
          icon: classes.icon,
        }}
        onChange={handleChange}
        value={currentLanguage}
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
