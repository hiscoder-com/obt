import React, { useContext } from 'react';
import { encode, decode } from 'js-base64';

import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';

import { Button } from '@material-ui/core';

export default function CopyLayout() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const {
    state: { appConfig },
  } = useContext(AppContext);

  const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text).then(
      () => {
        enqueueSnackbar(t('copied_success'), { variant: 'success' });
      },
      (err) => {
        enqueueSnackbar(t('copied_error'), { variant: 'error' });
      }
    );
  };
  const encodedLayout = () => {
    const test1 = encode(JSON.stringify(appConfig));
    copyToClipboard(test1);
    console.log(test1);
    return test1;
    // const test2 = decode(test1);
    // console.log(test2);
  };
  const decodedLayout = () => {
    const test2 = decode(encodedLayout());
    console.log(test2);
  };

  return (
    <>
      <Button onClick={encodedLayout}>Copy</Button>
      <Button onClick={decodedLayout}>Copy de</Button>
    </>
  );
}
