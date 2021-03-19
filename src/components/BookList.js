import React from 'react';
import { Projects } from './styled';
import { ResourcesContext } from 'scripture-resources-rcl';

function BookList({ onBookId }) {
  const { state } = React.useContext(ResourcesContext);

  const otBookList =
    state && state.resources && state.resources[0] && state.resources[0].projects
      ? state.resources[0].projects
          .filter((project) => project.categories[0] === 'bible-ot')
          .map((project) => (
            <p key={project.sort}>
              <button onClick={() => onBookId(project.identifier)}>
                {project.title}
              </button>
            </p>
          ))
      : [];

  const ntBookList =
    state && state.resources && state.resources[0] && state.resources[0].projects
      ? state.resources[0].projects
          .filter((project) => project.categories[0] === 'bible-nt')
          .map((project) => (
            <p key={project.sort}>
              <button onClick={() => onBookId(project.identifier)}>
                {project.title}
              </button>
            </p>
          ))
      : [];

  return (
    <Projects>
      <h2>New Testament</h2>
      <div>{ntBookList}</div>
      <h2>Old Testament</h2>
      <div>{otBookList}</div>
    </Projects>
  );
}

export default BookList;
