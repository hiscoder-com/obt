import React from 'react';

import { Card, useContent } from 'translation-helps-rcl';

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
  const { bookId, chapter } = reference;
  const content = useContent({
    chapter: chapter,
    projectId: bookId,
    branch: resource.branch,
    languageId: resource.languageId,
    resourceId: resource.name.split('_')[1],
    owner: resource.owner,
    server,
  });
  return (
    <Card
      closeable
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
  );
}
