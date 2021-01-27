import React from 'react';

import {
  ResourcesContext,
} from "scripture-resources-rcl";
import { Container, Header, ListNew } from './styled';

function BookListNew ({onBookId}) {
  const {state} = React.useContext(ResourcesContext);
  
  const bookListNew = (
      state && state.resources && state.resources[0] && state.resources[0].projects ) ? 
    state.resources[0].projects.filter(itm => itm.categories[0]==='bible-nt').map(itm => <p style ={{padding: '5px'}}> {itm.title} </p>) : [];
  
  return (
   <Container>
       <Header>
       New Testament
       </Header>
        <ListNew>
        {bookListNew}
        </ListNew>
    </Container>    
    
  );
}

export default BookListNew;