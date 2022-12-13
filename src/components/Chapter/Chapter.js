import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import axios from 'axios';

import { Card, useContent } from 'translation-helps-rcl';
import { DialogUI } from '../DialogUI';

import USFMContent from './USFMContent';

export default function Chapter({
  title,
  classes,
  onClose,
  resource,
  type,
  reference,
  fontSize,
  server,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [license, setLicense] = useState('');
  const { bookId, chapter } = reference;
  const content = useContent({
    chapter: chapter,
    projectId: bookId,
    ref: resource.ref,
    languageId: resource.languageId,
    resourceId: resource.name.split('_')[1],
    owner: resource.owner,
    server,
  });

  const getLicense = () => {
    const {
      resource: { username, repository, config, tag },
    } = content;
    try {
      axios
        .get(`${config?.server}/${username}/${repository}/raw/branch/${tag}/LICENSE.md`)
        .then((res) => setLicense(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card
        closeable
        onLicense={() => {
          setOpenModal(true);
          getLicense();
        }}
        disableSettingsButton
        onClose={onClose}
        title={title}
        type={type}
        id={type}
        classes={{ ...classes, root: classes.root + ' intro-card' }}
        fontSize={fontSize}
      >
        <USFMContent
          fontSize={fontSize}
          content={content}
          type={type}
          reference={reference}
          languageId={resource.languageId}
        />
      </Card>
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
