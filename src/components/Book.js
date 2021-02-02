import React from 'react';
import { ParallelScripture } from 'scripture-resources-rcl';
import { BookContainer } from './styled';

function Book(props) {
  const [bookId] = React.useState();
  const reference = { bookId };
  return (
    <BookContainer>
      <button
        onClick={() => {
          props.setBookId(null);
        }}
      >
        Back
      </button>
      <ParallelScripture reference={reference} quote="" height="80vh" />;
    </BookContainer>
  );
}

export default Book;
