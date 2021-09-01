import React, { useContext } from 'react';

import { Card, useContent } from 'translation-helps-rcl';

import OBSContent from './OBSContent';

import { AppContext, ReferenceContext } from '../../context';
import { server } from '../../config/base';

export default function OBSVerses({ title, classes, onClose, type }) {
  const {
    state: { fontSize, resourcesApp },
  } = useContext(AppContext);

  const {
    state: {
      referenceSelected: { bookId, chapter, verse },
    },
    actions: { onChangeVerse },
  } = useContext(ReferenceContext);

  let resource = false;

  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  const { markdown } = useContent({
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: resource.resourceId ?? 'obs',
    filePath: String(chapter).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'bsa',
    server,
  });

  return (
    <>
      <Card
        closeable
        title={title}
        onClose={() => onClose(type)}
        classes={{ ...classes, children: 'obs' }}
        fontSize={fontSize}
      >
        <OBSContent
          markdown={markdown}
          fontSize={fontSize}
          verse={verse}
          onChangeVerse={onChangeVerse}
          type={type}
        />
      </Card>
    </>
  );
}
