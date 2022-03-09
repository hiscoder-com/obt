import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { element } from 'prop-types';

export default function CopyLayout() {
  const {
    state: { appConfig, saveLayout, languageResources },
    actions: { setAppConfig, setSaveLayout },
  } = useContext(AppContext);

  const [nameLayout, setNameLayout] = useState('Название лэяута');
  const [value, setValue] = useState(appConfig);
  const [arr, setArr] = useState(saveLayout ? saveLayout : []);

  const create = () => {
    setSaveLayout(arr);
    setArr([...arr, { name: nameLayout, value: value }]);
  };
  const utilize = (event) => {
    console.log(event.target);
  };
  const result = arr.map((element, index) => {
    return (
      <button key={index} onClick={utilize}>
        {element.name}
      </button>
    );
  });
  return (
    <>
      <FormControl>
        <InputLabel shrink id="themeId">
          Layouts
        </InputLabel>
        <Select disableUnderline={true}>{<MenuItem>{result}</MenuItem>}</Select>
      </FormControl>
      <form name="test" method="post">
        <p>
          <input
            type="text"
            onChange={(event) => setNameLayout(event.target.value)}
            placeholder={nameLayout}
            size="40"
          />
        </p>
        <p>
          <textarea
            name="comment"
            cols="60"
            rows="7"
            onChange={(event) => setValue(event.target.value)}
            defaultValue={JSON.stringify(appConfig)}
          ></textarea>
        </p>
      </form>
      <Button onClick={create}> saveLayout</Button>
    </>
  );
}
