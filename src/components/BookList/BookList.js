import React from 'react';
import { ResourcesContext } from 'scripture-resources-rcl';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { bibleList } from '../config';

import { Projects } from './styled';

function BookList({ onBookId }) {
  let issetCheck = false;
  const { state } = React.useContext(ResourcesContext);
  // if (state) {
  //   debugger;
  // }
  const resourseList = bibleList;

  const [checkState, setCheckState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setCheckState({ ...checkState, [event.target.name]: event.target.checked });
  };

  const stateResourse =
    state && state.resources && state.resources[0] && state.resources[0].projects
      ? state.resources[0].projects.map((project) => project.identifier)
      : [];

  resourseList.forEach(function (item) {
    stateResourse.includes(item.identifier) ? (item.isset = true) : (issetCheck = true);
  });

  function renderBookList(mainResourse, categories) {
    return mainResourse
      .filter((mainResourse) => mainResourse.categories === categories)
      .map((mainResourse) => (
        <p key={mainResourse.sort}>
          {mainResourse.isset ? (
            <button onClick={() => onBookId(mainResourse.identifier)}>
              {mainResourse.title}
            </button>
          ) : (
            <falsebutton>{mainResourse.title}</falsebutton>
          )}
        </p>
      ));
  }

  const otBookList = renderBookList(resourseList, 'bible-ot');
  const ntBookList = renderBookList(resourseList, 'bible-nt');

  const hideCheckRender =
    issetCheck === true ? (
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedC"
            color="primary"
          />
        }
        label="show only existing books"
      />
    ) : (
      []
    );

  return (
    <Projects>
      {hideCheckRender}
      <h2>New Testament</h2>
      <div>{ntBookList}</div>
      <h2>Old Testament</h2>
      <div>{otBookList}</div>
    </Projects>
  );
}

export default BookList;
