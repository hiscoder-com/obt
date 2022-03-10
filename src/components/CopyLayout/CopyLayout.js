import React, { useContext, useState, useEffect, useMemo } from 'react';
import { AppContext } from '../../context';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export default function CopyLayout() {
  const {
    state: { appConfig, saveLayout, languageResources },
    actions: { setAppConfig, setSaveLayout, setLanguageResources },
  } = useContext(AppContext);

  const [nameLayout, setNameLayout] = useState('default Name');
  const [value, setValue] = useState(appConfig);

  const create = () => {
    setSaveLayout((prev) => [
      ...prev,
      { name: nameLayout, value: value, language: languageResources },
    ]);
  };
  const utilize = (event) => {
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
      <FormControl>
        <InputLabel shrink id="themeId">
          Layouts
        </InputLabel>
        <Select onChange={utilize} disableUnderline={true}>
          {result}
        </Select>
      </FormControl>
      <input
        type="text"
        onChange={(event) => setNameLayout(event.target.value)}
        placeholder={'layout name'}
        size="40"
        value={nameLayout}
      />
      <textarea
        name="comment"
        cols="60"
        rows="7"
        onChange={(event) => setValue(event.target.value)}
        value={JSON.stringify(value)}
      />
      <Button onClick={create}> saveLayout</Button>
    </>
  );
}
