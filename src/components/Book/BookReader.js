import React, { useState } from 'react';
import { Book } from 'scripture-resources-rcl';

import { BookContainer } from './styled';

function BookReader(props) {
  const { project, setBook } = props;
  const [parsedBook, setParsedBook] = useState(null);

  const parseBook = project ? project.parseUsfm() : null;
  const successCallback = (result) => setParsedBook(result);
  const errorCallback = (error) => console.log(error);

  parseBook.then(successCallback, errorCallback);

  return (
    <BookContainer>
      <button
        onClick={() => {
          setBook(null);
        }}
      >
        Back
      </button>
      {parsedBook ? <Book book={parsedBook} disableWordPopover={true} /> : ''}
    </BookContainer>
  );
}

export default BookReader;
