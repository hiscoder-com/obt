import React, { useState, useMemo, useEffect } from 'react';
import { Card } from 'translation-helps-rcl';
import { Verses, ResourcesContext } from 'scripture-resources-rcl';
import { useTranslation } from 'react-i18next';

import { resourcesList } from '../../config';

export default function Chapter(props) {
  const { title, classes, onClose, type, reference } = props;
  const { t } = useTranslation();
  const { state } = React.useContext(ResourcesContext);
  let project = useMemo(() => {}, []);

  const [chapter, setChapter] = useState();

  const resource = resourcesList[type];

  if (state?.resources) {
    state.resources.forEach((el) => {
      if (el.resourceId === resource.resourceId && el.username === resource.owner) {
        project = el.project;
      }
    });
  }

  useEffect(() => {
    if (project && Object.keys(project).length !== 0) {
      project.parseUsfm().then(
        (result) => {
          if (Object.keys(result.chapters).length > 0) {
            setChapter(result.chapters[reference.chapter]);
          } else {
            console.log('Book not found');
          }
        },
        (error) => console.log(error)
      );
    } else {
      // Book could not be found in this translation:
      setChapter(null);
    }
  }, [project, reference.chapter]);

  return (
    <Card
      closeable
      onClose={() => onClose(type)}
      title={title}
      type={type}
      classes={classes}
    >
      {chapter ? (
        <Verses
          disableWordPopover={true}
          reference={reference}
          verses={chapter}
          renderOffscreen={true}
        />
      ) : (
        t('Loading')
      )}
    </Card>
  );
}
