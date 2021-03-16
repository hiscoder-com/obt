import React, { useState, useEffect } from 'react';
import { Card } from 'translation-helps-rcl';
import { Verses } from 'scripture-resources-rcl';
import { ResourcesContext } from 'scripture-resources-rcl';

export default function Chapter(props) {
  const { type, title, classes, onClose, index } = props;
  const { state } = React.useContext(ResourcesContext);

  const [chapter, setChapter] = useState();
  const [reference, setReference] = useState({ bookId: 'tit', chapter: 1 });

  useEffect(() => {
    if (
      state.resources[type] !== undefined &&
      state.resources[type].project !== undefined
    ) {
      const parseBook = state.resources[type].project.parseUsfm();
      const successCallback = (result) => {
        if (Object.keys(result.chapters).length > 0) {
          setChapter(result.chapters[state.resources[type].reference.chapter]);
          setReference(state.resources[type].reference);
        } else {
          console.log('Book not found');
        }
      };
      const errorCallback = (error) => console.log(error);
      parseBook.then(successCallback, errorCallback);
    }
  }, [type, state.resources]);
  return (
    <Card closeable onClose={() => onClose(index)} title={title} classes={classes}>
      {chapter !== undefined ? (
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
