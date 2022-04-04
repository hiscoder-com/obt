import React, { useContext } from 'react';

import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';

import { useStyles } from './style';

const options = [
  { key: 'textTree', label: 'Theme_TextTree' },
  { key: 'obt', label: 'Theme_OBT' },
  // { key: 'dark', label: 'Theme_Dark' },
];

function SelectTheme() {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    state: { theme },
    actions: { setTheme },
  } = useContext(AppContext);

  const handleChange = (e) => setTheme(e.target.value);

  return (
    <FormControl variant="outlined">
      <Select className={classes.select} onChange={handleChange} value={theme}>
        {options.map((el) => (
          <MenuItem key={el.key} value={el.key}>
            {t(el.label).toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectTheme;
