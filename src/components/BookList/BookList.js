import React, { useContext, useState } from 'react';

import { ResourcesContext } from 'scripture-resources-rcl';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { bibleList } from '../../config';

import { Projects, useStyles } from './styled';

function BookList({ onBook }) {
  const { state } = useContext(ResourcesContext);
  const [checkState, setCheckState] = useState({
    checkedA: false,
  });

  let issetCheck = false;
  console.log('state', state);

  const classes = useStyles();

  const handleChange = (event) => {
    setCheckState({ ...checkState, [event.target.name]: event.target.checked });
  };

  const bookListIsset = () => {
    for (let i = 0; i < state.resources.length; ++i) {
      bibleList.forEach((item) => {
        if (state.resources.length > 0) {
          if (
            state.resources[i].projects
              .map((project) => project.identifier)
              .includes(item.identifier)
          ) {
            item.isset = true;
          }
        } else {
          item.isset = false;
        }
      });
    }
    return bibleList;
  };

  bookListIsset();
  console.log('bibleList', bibleList);

  const stateResourse =
    state && state.resources && state.resources[0] && state.resources[0].projects
      ? state.resources[0].projects.map((project) => project)
      : [];

  function linkBook(item) {
    for (let i = 0; i < stateResourse.length; ++i) {
      if (item === stateResourse[i].identifier) {
        return stateResourse[i];
      }
    }
  }

  const renderBookList = (bibleList, categories) => {
    return bibleList
      .filter((bibleList) =>
        checkState.checkedA
          ? bibleList.categories === categories && bibleList.isset === true
          : bibleList.categories === categories
      )
      .map((bibleList) => (
        <p key={bibleList.sort}>
          {bibleList.isset ? (
            <button onClick={() => onBook(linkBook(bibleList.identifier))}>
              {bibleList.title}
            </button>
          ) : (
            <span className={classes.falseElement}>{bibleList.title}</span>
          )}
        </p>
      ));
  };

  const otBookList = renderBookList(bibleList, 'bible-ot');
  const ntBookList = renderBookList(bibleList, 'bible-nt');

  const hideCheckRender =
    issetCheck === true ? (
      <FormControlLabel
        control={
          <Checkbox
            checked={checkState.checkedA}
            onChange={handleChange}
            name="checkedA"
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
