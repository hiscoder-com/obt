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
}));

export default function SelectLanguage() {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <NativeSelect
          style={{ color: 'white', background: '#2c2c2c' }}
          defaultValue={10}
          inputProps={{
            name: '',
            id: '',
          }}
        >
          <option style={{ color: 'white', background: '#2c2c2c' }} value={10}>
            Eng
          </option>
          <option style={{ color: 'white', background: '#2c2c2c' }} value={20}>
            Rus
          </option>
          <option style={{ color: 'white', background: '#2c2c2c' }} value={30}>
            Kz
          </option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}
