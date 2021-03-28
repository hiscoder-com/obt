import React from 'react';

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

  return (
    <div>
      <FormControl className={classes.formControl}>
        <WhiteIconNativeSelect className={classes.nativeSelect} defaultValue={10}>
          <option className={classes.optionStyle} value={10}>
            Eng
          </option>
        </WhiteIconNativeSelect>
      </FormControl>
    </div>
  );
}
