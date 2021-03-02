import React from 'react';
import { ResourcesContextProvider } from 'scripture-resources-rcl';

import BookReader from './components/Book/BookReader';
import BookList from './components/BookList/BookList';
import MenuBar from './components/MenuBar/MenuBar';

import './style.css';

function App() {
  const config = { server: 'https://git.door43.org' };

  const _resourceLinks = ['ru_gl_final/ru_rlob/master'];

  const [resourceLinks, setResourceLinks] = React.useState(_resourceLinks);
  const [resources, setResources] = React.useState([]);
  const [book, setBook] = React.useState();
  const [bookId, setBookId] = React.useState();
  const reference = { bookId };

  const onBook = (project) => {
    setBook(project);
    setBookId(project ? project.identifier : null);
  };

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
          <BookReader onBook={onBook} project={book} />
        ) : (
          <BookList onBook={onBook} />
        )}
      </ResourcesContextProvider>
    </>
  );
}

export default App;
