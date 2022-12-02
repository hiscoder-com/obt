import { Button } from '@material-ui/core';
import axios from 'axios';
import { t } from 'i18next';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DialogUI } from '../DialogUI';

function LicenseViewer({ config }) {
  const [license, setLicense] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { server, repository, owner, branch } = config;
  const getLicense = () => {
    if (server && repository && owner && branch) {
      try {
        axios
          .get(`${server}/${owner}/${repository}/raw/branch/${branch}/LICENSE.md`)
          .then((res) => setLicense(res.data))
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(true);
          getLicense();
        }}
      >
        {t('License')}
      </Button>
      <DialogUI
        open={openModal}
        maxWidth={'sm'}
        onClose={() => setOpenModal(false)}
        title={`License`}
      >
        <ReactMarkdown className={'md'}>{license}</ReactMarkdown>
      </DialogUI>
    </>
  );
}

export default LicenseViewer;
