import React, { useContext, useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import { Card, useContent } from 'translation-helps-rcl';

import { AppContext, ReferenceContext } from '../../context';
import OBSContent from './OBSContent';

import { server } from '../../config/base';

import { useStyles } from './style';

export default function OBSVerses({ title, classes, onClose, type, onLicense }) {
  const classesCircular = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const {
    state: { fontSize, resourcesApp },
  } = useContext(AppContext);

  const {
    state: {
      referenceSelected: { chapter, verse },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  let resource = false;

  resourcesApp.forEach((el) => {
    if (el.owner + '__' + el.name === type) {
      resource = el;
    }
  });
  const { markdown, resourceStatus } = useContent({
    filePath: String(chapter).padStart(2, '0') + '.md',
    resourceId: resource.resourceId ?? 'obs',
    languageId: resource.languageId ?? 'ru',
    owner: resource.owner ?? 'bsa',
    ref: resource.ref ?? 'master',
    projectId: 'obs',
    server,
  });

  useEffect(() => {
    setIsLoading(!(resourceStatus.initialized && !resourceStatus.loading));
  }, [resourceStatus]);

  return (
    <>
      <Card
        classes={{ ...classes, children: 'obs', root: classes.root + ' intro-card' }}
        disableSettingsButton
        onLicense={onLicense}
        fontSize={fontSize}
        onClose={onClose}
        title={title}
        id={type}
        closeable
      >
        {isLoading ? (
          <div className={classesCircular.circular}>
            <CircularProgress color="primary" size={100} />
          </div>
        ) : (
          <OBSContent
            goToBookChapterVerse={goToBookChapterVerse}
            resource={resource}
            markdown={markdown}
            fontSize={fontSize}
            chapter={chapter}
            server={server}
            verse={verse}
            type={type}
          />
        )}
      </Card>
    </>
  );
}
