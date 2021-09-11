import React, { useState, useContext } from 'react';

import { Card, useContent } from 'translation-helps-rcl';

import USFMContent from './USFMContent';
import VerseMenu from './VerseMenu';
import { AppContext, ReferenceContext } from '../../context';

import { server } from '../../config/base';

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

export default function Chapter({ title, classes, onClose, resource, type, reference }) {
  const [position, setPosition] = useState(initialPosition);
  const {
    state: { fontSize },
  } = useContext(AppContext);

  const {
    state: {
      referenceSelected: { bookId, chapter },
    },
  } = useContext(ReferenceContext);

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
