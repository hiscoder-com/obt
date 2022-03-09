import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export default function CopyLayout() {
  const {
    state: { appConfig, saveLayout },
    actions: { setAppConfig, setSaveLayout },
  } = useContext(AppContext);
  // const [saveLayout, setSaveLayout] = useState();
  const [stValue, setStValue] = useState(JSON.stringify(appConfig));
  const [nameLayout, setNameLayout] = useState('Название лэяута');
  const [arr, setArr] = useState([]);
  const layout = {
    name: nameLayout,
    value: stValue,
  };
  // console.log(layout);
  console.log(arr);
  console.log(saveLayout);
  const CopyLayout = () => {
    setSaveLayout(layout);
  };
  const getLayout = () => {
    setAppConfig(JSON.parse(saveLayout.value));
  };
  const onClick = (event) => {
    setStValue(event.target.value);
  };
  const onClicks = (event) => {
    setNameLayout(event.target.value);
  };
  const result = arr.map((element, index) => {
    return (
      <button key={index} onClick={getLayout} onDoubleClick={() => remove(index)}>
        {element.name}
      </button>
    );
  });
  function remove(index) {
    setArr([...arr.slice(0, index), ...arr.slice(index + 1)]);
  }
  // return (
  //   <div>
  //     {result}
  //     {/* <button value={value} onChange={(event) => setValue(event.target.value)} /> */}
  //     <button onClick={() => setArr([...arr, value])}>Добавить элемент</button>
  //   </div>
  // );
  return (
    <>
      <FormControl>
        <InputLabel shrink id="themeId">
          Layouts
        </InputLabel>
        <Select disableUnderline={true} labelId="themeId">
          {<MenuItem>{result}</MenuItem>}
        </Select>
      </FormControl>
      <form name="test" method="post">
        <p>
          <input type="text" onChange={onClicks} placeholder={nameLayout} size="40" />
        </p>
        <p>
          <textarea
            name="comment"
            cols="60"
            rows="7"
            onChange={onClick}
            defaultValue={stValue}
          ></textarea>
        </p>
      </form>
      <Button onClick={(CopyLayout, () => setArr([...arr, layout]))}>saveLayout</Button>
      {/* <Button onClick={getLayout}>{nameLayout}</Button> */}
    </>
  );
}
