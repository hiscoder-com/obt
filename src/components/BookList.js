import React from 'react';

import {
  ResourcesContext,
} from "scripture-resources-rcl";

function BookList ({onBookId}) {
  const {state} = React.useContext(ResourcesContext);
  
  const bookListOld = (state && state.resources && state.resources[0] && state.resources[0].projects ) ? 
    state.resources[0].projects.filter(itm => itm.categories[0]==='bible-ot').map(itm => <p style={{color: 'blue', marginLeft:'300px'}}> {itm.title} </p>) : [];
  const bookListNew = (state && state.resources && state.resources[0] && state.resources[0].projects ) ? 
    state.resources[0].projects.filter(itm => itm.categories[0]==='bible-nt').map(itm => <p style={{color: 'blue',marginLeft:'30px'}}> {itm.title} </p>) : [];
  return (
    <p>
  <h2 style={{color: '#49423d',marginLeft:'300px'}}><a onClick ={() => onBookId(bookListOld)}   >Old Testament</a></h2>
  <h2 style={{color: '#49423d',marginLeft:'30px'}}><a onClick ={() => onBookId(bookListNew)}   >New Testament</a></h2>
    </p>
  );
}

export default BookList;