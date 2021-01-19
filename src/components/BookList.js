import React from 'react';

import {
  ResourcesContext,
} from "scripture-resources-rcl";

function BookList ({onBookId}) {
  const {state} = React.useContext(ResourcesContext);
  if (state)
  {
    debugger;
  }

  const bookList = (state && state.resources && state.resources[0] && state.resources[0].projects)? 
      state.resources[0].projects.map(
        b => <p style={{color: 'black'}}><a onClick={() => onBookId(b.identifier)}>{b.title}</a></p>
      ) : [];

  return (
    <>
    {bookList}
    </>
  );
}

export default BookList;