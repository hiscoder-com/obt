import React, { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Card } from 'translation-helps-rcl';
import { Verses } from 'scripture-resources-rcl';
import { ResourcesContext } from 'scripture-resources-rcl';

export default function Chapter(props) {
  const { type, title, classes, onClose, index, reference, onReference } = props;
  const { state } = React.useContext(ResourcesContext);

  const [chapter, setChapter] = useState();

  const successCallback = (result) => {
    if (Object.keys(result.chapters).length > 0) {
      setChapter(result.chapters[state.resources[type].reference.chapter]);
      onReference(state.resources[type].reference);
    } else {
      console.log('Book not found');
    }
  };

  useDeepCompareEffect(() => {
    if (
      state.resources[type] !== undefined &&
      state.resources[type].project !== undefined
    ) {
      const parseBook = state.resources[type].project.parseUsfm();
      const errorCallback = (error) => console.log(error);
      parseBook.then(successCallback, errorCallback);
    }
    else
    {
      // Book could not be found in this translation:
      setChapter(null);
    }
  }, [type, state.resources, onReference]);

  return (
    <Card closeable onClose={() => onClose(index)} title={title} classes={classes}>
      {chapter? (
        <Verses
          disableWordPopover={true}
          reference={reference}
          verses={chapter}
          renderOffscreen={false}
        />
      ) : (
        'Loading...'
      )}
    </Card>
  );
}
