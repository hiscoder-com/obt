import React, { useContext, useState, useEffect } from 'react';

import { Card, useContent } from 'translation-helps-rcl';
import { CircularProgress } from '@material-ui/core';

import { AppContext, ReferenceContext } from '../../context';
import OBSContent from './OBSContent';

import { server } from '../../config/base';

import { useStyles } from './style';

export default function OBSVerses({ title, classes, onClose, type }) {
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
    projectId: 'obs',
    ref: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: resource.resourceId ?? 'obs',
    filePath: String(chapter).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'bsa',
    server,
  });

  useEffect(() => {
    setIsLoading(!(resourceStatus.initialized && !resourceStatus.loading));
  }, [resourceStatus]);

  return (
    <>
      <Card
        closeable
        onLicense
        disableSettingsButton
        title={title}
        onClose={onClose}
        classes={{ ...classes, children: 'obs', root: classes.root + ' intro-card' }}
        id={type}
        fontSize={fontSize}
      >
        {isLoading ? (
          <div className={classesCircular.circular}>
            <CircularProgress color="primary" size={100} />
          </div>
        ) : (
          <OBSContent
            server={server}
            resource={resource}
            markdown={markdown}
            fontSize={fontSize}
            verse={verse}
            chapter={chapter}
            goToBookChapterVerse={goToBookChapterVerse}
            type={type}
          />
        )}
      </Card>
    </>
  );
}
