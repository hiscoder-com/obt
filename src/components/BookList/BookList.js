import React, { useContext, useState } from 'react';

import { ResourcesContext } from 'scripture-resources-rcl';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { bibleList } from '../../config';

import { Projects, useStyles } from './styled';

function BookList({ onBook }) {
  const { state } = useContext(ResourcesContext);
  const [checkState, setCheckState] = useState(false);
  const classes = useStyles();
  const currentBibleList = JSON.parse(JSON.stringify(bibleList));

  const handleChange = () => {
    setCheckState((prev) => !prev);
  };

  let issetCheck = false;
  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      currentBibleList.forEach((item) => {
        if (
          item.isset ||
          resource.projects.map((project) => project.identifier).includes(item.identifier)
        ) {
          item.isset = true;
        } else {
          issetCheck = true;
        }
      });
    });
  }

  const renderBookList = (currentBibleList, categories) => {
    return currentBibleList
      .filter((currentBibleList) =>
        checkState
          ? currentBibleList.categories === categories && currentBibleList.isset === true
          : currentBibleList.categories === categories
      )
      .map((currentBibleList) => (
        <p key={currentBibleList.sort}>
          {currentBibleList.isset ? (
            <button onClick={() => onBook(currentBibleList.identifier)}>
              {currentBibleList.title}
            </button>
          ) : (
            <span className={classes.falseElement}>{currentBibleList.title}</span>
          )}
        </p>
      ));
  };

  const otBookList = renderBookList(currentBibleList, 'bible-ot');
  const ntBookList = renderBookList(currentBibleList, 'bible-nt');

  const hideCheckRender = issetCheck ? (
    <FormControlLabel
      control={
        <Checkbox
          checked={checkState}
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
