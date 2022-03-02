import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

export default function CopyLayout() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
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
  const pamagite = () => {
    copyToClipboard('marvel');
    enqueueSnackbar('privet', { variant: 'error' });
  };
  return (
    <>
      <Button onClick={pamagite}> Copy</Button>
    </>
  );
}
