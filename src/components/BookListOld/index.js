import React from 'react';

import {
  ResourcesContext,
} from "scripture-resources-rcl";
import { Container, Header, ListOld } from './styled';

function BookListOld ({onBookId}) {
  const {state} = React.useContext(ResourcesContext);
  
  const bookListOld = (
      state && state.resources && state.resources[0] && state.resources[0].projects ) ? 
    state.resources[0].projects.filter(itm => itm.categories[0]==='bible-ot').map(itm => <p style ={{padding: '5px'}}> {itm.title} </p>) : [];
  
  return (
   <Container>
       <Header>
       Old Testament
       </Header>
        <ListOld>
        {bookListOld}
        </ListOld>
    </Container>    
    
  );
}

export default BookListOld;