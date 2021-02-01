import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

console.log(makeStyles);
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  nativeSelect: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: 'white',
  },
  optionStyle: {
    color: 'black',
  },
}));

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
