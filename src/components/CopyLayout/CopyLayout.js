import React, { useContext, useState } from 'react';
import { encode, decode } from 'js-base64';

import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';

import { Button } from '@material-ui/core';

export default function CopyLayout() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    state: { appConfig, saveLayout },
    actions: { setSaveLayout, setAppConfig },
  } = useContext(AppContext);
  const [stValue, setStValue] = useState(JSON.stringify(appConfig));

  const CopyLayout = () => {
    setSaveLayout(stValue);
  };
  console.log(saveLayout, 'новый лаяут');
  const getLayout = () => {
    setAppConfig(JSON.parse(saveLayout));
  };

  const onClick = (event) => {
    setStValue(event.target.value);
  };

  return (
    <>
      <form name="test" method="post" action="input1.php">
        <p>
          <input type="text" placeholder="название сохраняемого layouta" size="40" />
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
      <Button onClick={CopyLayout}>saveLayout</Button>
      <Button onClick={getLayout}>Get Layout</Button>
    </>
  );
}
