import React from 'react';
import { ParallelScripture } from 'scripture-resources-rcl';

function Book(props) {
  const [bookId] = React.useState();
  const reference = { bookId };
  return (
    <>
      <div
        onClick={() => {
          props.setBookId(null);
        }}
      >
        Back
      </div>
      <ParallelScripture reference={reference} quote="" height="250px" />;
    </>
  );
}

export default Book;
