import React, { useContext, useState, useEffect, useMemo } from 'react';
import { AppContext } from '../../context';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useStyles } from './style';

export default function CopyLayout() {
  const classes = useStyles();

  const {
    state: { appConfig, saveLayout, languageResources },
    actions: { setAppConfig, setSaveLayout, setLanguageResources },
  } = useContext(AppContext);

  const [nameLayout, setNameLayout] = useState('');
  const [value, setValue] = useState(appConfig);

  const create = () => {
    setSaveLayout((prev) => [
      ...prev,
      { name: nameLayout, value: value, language: languageResources },
    ]);
    setNameLayout('');
  };
  const buttonsFunc = (event) => {
    let val = saveLayout[event.target.value];
    setLanguageResources(val.language);
    setAppConfig(val.value);
  };
  // useMemo(зависит от saveLayout)
  const result = useMemo(
    () =>
      saveLayout.map((element, index) => {
        console.log(index);
        return (
          <MenuItem value={index} key={index}>
            {element.name}
          </MenuItem>
        );
      }),
    [saveLayout]
  );
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="themeId">
          Layouts
        </InputLabel>
        <Select onChange={buttonsFunc} disableUnderline={true}>
          {result}
        </Select>
      </FormControl>
      <TextField
        className={classes.layoutName}
        onChange={(event) => setNameLayout(event.target.value)}
        id="outlined-basic"
        label="Layout Name"
        variant="outlined"
        value={nameLayout}
        // defaultValue={nameLayout}
      />
      <TextField
        multiline={true}
        rows={3}
        name="comment"
        onChange={(event) => setValue(event.target.value)}
        defaultValue={JSON.stringify(value)}
        fullWidth={true}
        size="small"
        variant="outlined"
      />
      <Button onClick={create}> saveLayout</Button>
    </>
  );
}
