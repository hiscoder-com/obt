import React from 'react';

import { useTranslation } from 'react-i18next';
import { FormControl, NativeSelect } from '@material-ui/core';
import styled from 'styled-components';
import useStyles from './style';

const WhiteIconNativeSelect = styled(NativeSelect)`
  .MuiNativeSelect-icon {
    color: white;
  }
`;

export default function SelectLanguage() {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const localValueLanguage = localStorage.getItem('i18nextLng');
  function handleChange(event) {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <WhiteIconNativeSelect
          className={classes.nativeSelect}
          onChange={handleChange}
          defaultValue={localValueLanguage ? localValueLanguage : 'ru'}
        >
          <option className={classes.optionStyle} value={'en'}>
            Eng
          </option>
          <option className={classes.optionStyle} value={'ru'}>
            Рус
          </option>
        </WhiteIconNativeSelect>
      </FormControl>
    </div>
  );
}
