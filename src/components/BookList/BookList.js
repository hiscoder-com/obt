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
  const trueBibleList = JSON.parse(JSON.stringify(bibleList));

  const handleChange = () => {
    setCheckState((prev) => !prev);
  };

  let issetCheck = false;
  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      trueBibleList.forEach((item) => {
        item.isset = true;
      });
      currentBibleList.forEach((item) => {
        if (
          item.isset ||
          resource.projects.map((project) => project.identifier).includes(item.identifier)
        ) {
          item.isset = true;
        } else {
        }
      });
    });
  }
  if (JSON.stringify(currentBibleList) !== JSON.stringify(trueBibleList)) {
    issetCheck = true;
  }
  const renderBookList = (currentBibleList, categories) => {
    return currentBibleList
      .filter((el) =>
        checkState
          ? el.categories === categories && el.isset === true
          : el.categories === categories
      )
      .map((el) => (
        <p key={el.sort}>
          {el.isset ? (
            <button onClick={() => onBook(el.identifier)}>{el.title}</button>
          ) : (
            <span className={classes.falseElement}>{el.title}</span>
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
