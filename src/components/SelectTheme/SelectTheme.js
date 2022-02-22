import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const options = [
  { key: 'textTree', label: 'ThemeTextTree' },
  { key: 'obt', label: 'ThemeObt' },
  // { key: 'dark', label: 'ThemeDark' },
];

function SelectTheme() {
  const { t } = useTranslation();

  const {
    state: { theme },
    actions: { setTheme },
  } = useContext(AppContext);

  const handleChange = (e) => setTheme(e.target.value);

  return (
    <FormControl>
      <InputLabel shrink id="themeId">
        {t('ThemeLabel')}
      </InputLabel>
      <Select
        disableUnderline={true}
        onChange={handleChange}
        value={theme}
        labelId="themeId"
      >
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
