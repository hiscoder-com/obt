import React, { useState, useEffect, useContext } from 'react';

import { Card, useContent } from 'translation-helps-rcl';

import USFMContent from './USFMContent';
import VerseMenu from './VerseMenu';
import { AppContext, ReferenceContext } from '../../context';

import { server } from '../../config/base';

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

export default function Chapter({ title, classes, onClose, type, reference }) {
  const [position, setPosition] = useState(initialPosition);
  const {
    state: { resourcesApp, fontSize },
  } = useContext(AppContext);

  const {
    state: {
      referenceSelected: { bookId, chapter },
    },
  } = useContext(ReferenceContext);

  const [resource, setResource] = useState(false);

  useEffect(() => {
    resourcesApp.forEach((el) => {
      if (el.name === type) {
        setResource(el);
      }
    });
  }, [resourcesApp, type]);

  const content = useContent({
    chapter: chapter,
    projectId: bookId,
    branch: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: type.split('_')[1] ?? 'rob',
    owner: resource.owner ?? 'door43-catalog',
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
