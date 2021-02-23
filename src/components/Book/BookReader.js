import React, { useState, useEffect } from 'react';
import { Chapter } from 'scripture-resources-rcl';

import { BookContainer } from './styled';

function BookReader(props) {
  const { project, onBook } = props;
  const [parsedBook, setParsedBook] = useState(null);
  const [chapter, setChapter] = useState(1);

  useEffect(() => {
    const parseBook = project ? project.parseUsfm() : null;
    const successCallback = (result) => setParsedBook(result);
    const errorCallback = (error) => console.log(error);

    parseBook.then(successCallback, errorCallback);
  }, [project]);

  return (
    <BookContainer>
      <button
        onClick={() => {
          onBook(null);
        }}
      >
        Back
      </button>
      {project ? <h1>{project.title}</h1> : ''}
      {parsedBook && parsedBook.chapters
        ? Object.keys(parsedBook.chapters).map((key) => (
            <button key={key} onClick={() => setChapter(key)}>
              Chapter {key}
            </button>
          ))
        : ''}
      {chapter && parsedBook && parsedBook.chapters ? (
        <Chapter
          disableWordPopover={true}
          chapter={parsedBook.chapters[chapter]}
          chapterKey={chapter.toString()}
        />
      ) : (
        ''
      )}
    </BookContainer>
  );
}

export default BookReader;
