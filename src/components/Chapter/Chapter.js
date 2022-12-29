import React from 'react';

import { Card, useContent } from 'translation-helps-rcl';

import USFMContent from './USFMContent';

export default function Chapter({
  reference,
  onLicense,
  resource,
  fontSize,
  classes,
  onClose,
  server,
  title,
  type,
}) {
  const { bookId, chapter } = reference;
  const content = useContent({
    resourceId: resource.name.split('_')[1],
    languageId: resource.languageId,
    owner: resource.owner,
    ref: resource.ref,
    projectId: bookId,
    chapter: chapter,
    server,
  });

  return (
    <>
      <Card
        classes={{ ...classes, root: classes.root + ' intro-card' }}
        disableSettingsButton
        onLicense={onLicense}
        fontSize={fontSize}
        onClose={onClose}
        title={title}
        type={type}
        id={type}
        closeable
      >
        <USFMContent
          languageId={resource.languageId}
          reference={reference}
          fontSize={fontSize}
          content={content}
          type={type}
        />
      </Card>
    </>
  );
}
