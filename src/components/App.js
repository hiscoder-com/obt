import React from 'react';

import { ResourcesContextProvider, ParallelScripture } from 'scripture-resources-rcl';

import BookList from './BookList';
import NavigationBar from './NavigationBar';
import { Container } from './styled';
import '../style.css';

function App() {
  const config = { server: 'https://git.door43.org' };

  const _resourceLinks = [
    'ru_gl/ru/rlob/master',
    'ru_gl/ru/rsob/master',
  ];

  const [resourceLinks, setResourceLinks] = React.useState(_resourceLinks);
  const [resources, setResources] = React.useState([]);
  const [bookId, setBookId] = React.useState();
  const reference = { bookId };

  return (
    <Container>
      <NavigationBar />
      <ResourcesContextProvider
        reference={reference}
        resourceLinks={resourceLinks}
        defaultResourceLinks={_resourceLinks}
        onResourceLinks={setResourceLinks}
        resources={resources}
        onResources={setResources}
        config={config}
      >
        <BookList onBookId={setBookId} />
        <ParallelScripture
              reference={reference}
              quote=""
              open
              height='250px'
            />
      </ResourcesContextProvider>
    </Container>
  );
}

export default App;
