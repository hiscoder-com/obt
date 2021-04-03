import React, { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Card } from 'translation-helps-rcl';
import { Verses } from 'scripture-resources-rcl';
import { ResourcesContext } from 'scripture-resources-rcl';

import { resourcesList } from '../../config';

import useStyles from './styled';

export default function Chapter(props) {
  const { title, onClose, type, reference } = props;
  const { state } = React.useContext(ResourcesContext);

  const [chapter, setChapter] = useState();

  const resource = resourcesList[type];

  const successCallback = (result) => {
    if (Object.keys(result.chapters).length > 0) {
      setChapter(result.chapters[reference.chapter]);
    } else {
      console.log('Book not found');
    }
  };
  let project = {};
  if (state?.resources) {
    state.resources.forEach((el) => {
      if (el.resourceId === resource.resourceId && el.username === resource.owner) {
        project = el.project;
      }
    });
  }

  useDeepCompareEffect(() => {
    if (Object.keys(project).length !== 0) {
      project.parseUsfm().then(successCallback, (error) => console.log(error));
    } else {
      // Book could not be found in this translation:
      setChapter(null);
    }
  }, [project]);

  const classes = useStyles();

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
        'Loading...'
      )}
    </Card>
  );
}
