import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import useStyles from './style';

export default function SelectLanguage() {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <NativeSelect className={classes.nativeSelect} defaultValue={10}>
          <option className={classes.optionStyle} value={10}>
            Eng
          </option>
          <option className={classes.optionStyle} value={20}>
            Rus
          </option>
          <option className={classes.optionStyle} value={30}>
            Kz
          </option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}
