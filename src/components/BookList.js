import React from 'react';

import { ResourcesContext } from 'scripture-resources-rcl';

function BookList({ onBookId }) {
  const { state } = React.useContext(ResourcesContext);
  if (state) {
    debugger;
  }

  const bookList =
    state && state.resources && state.resources[0] && state.resources[0].projects
      ? state.resources[0].projects.map((b, index) => (
          <p key={index} style={{ color: 'black' }}>
            <span onClick={() => onBookId(b.identifier)}>{b.title}</span>
          </p>
        ))
      : [];

  return <>{bookList}</>;
}

export default BookList;
