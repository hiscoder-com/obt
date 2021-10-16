import React, { useState } from 'react';

import { Card, useContent } from 'translation-helps-rcl';

import USFMContent from './USFMContent';
import VerseMenu from './VerseMenu';

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

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
  const [position, setPosition] = useState(initialPosition);
  const { bookId, chapter } = reference;
  const content = useContent({
    chapter: chapter,
    projectId: bookId,
    branch: resource.branch,
    languageId: resource.languageId,
    resourceId: type.split('_')[1],
    owner: resource.owner,
    server,
  });

  return (
    <Card
      closeable
      onClose={() => onClose(type)}
      title={title}
      type={type}
      classes={classes}
      fontSize={fontSize}
    >
      <VerseMenu
        position={position}
        setPosition={setPosition}
        initialPosition={initialPosition}
      />
      <USFMContent
        setPosition={setPosition}
        content={content}
        type={type}
        reference={reference}
      />
    </Card>
  );
}
