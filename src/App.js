import React from 'react';
import { ResourcesContextProvider } from 'scripture-resources-rcl';

import Book from './components/Book/Book';
import BookList from './components/BookList/BookList';
import MenuBar from './components/MenuBar/MenuBar';

import './style.css';

function App() {
  const config = { server: 'https://git.door43.org' };

  const _resourceLinks = ['ru_gl_final/ru_rsob/master'];

  const [resourceLinks, setResourceLinks] = React.useState(_resourceLinks);
  const [resources, setResources] = React.useState([]);
  const [bookId, setBookId] = React.useState();
  const reference = { bookId };

  return (
    <>
      <MenuBar />
      <ResourcesContextProvider
        reference={reference}
        resourceLinks={resourceLinks}
        defaultResourceLinks={_resourceLinks}
        onResourceLinks={setResourceLinks}
        resources={resources}
        onResources={setResources}
        config={config}
      >
        {reference.bookId ? (
          <Book setBookId={setBookId} />
        ) : (
          <BookList onBookId={setBookId} />
        )}
      </ResourcesContextProvider>
    </>
  );
}

export default App;
