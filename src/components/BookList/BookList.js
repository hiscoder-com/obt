import React, { useContext, useState } from 'react';

import { ResourcesContext } from 'scripture-resources-rcl';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import { bibleList } from '../../config';

import { Projects, useStyles } from './style';

const trueBibleList = JSON.parse(
  JSON.stringify(bibleList.map((item) => ({ ...item, isset: true })))
);

function BookList({ onBook, referenceSelected }) {
  const { state } = useContext(ResourcesContext);
  const [checkState, setCheckState] = useState(false);
  const classes = useStyles();
  const currentBibleList = JSON.parse(JSON.stringify(bibleList));
  const { t } = useTranslation();
  const handleChange = () => {
    setCheckState((prev) => !prev);
  };

  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      const identifiers = resource.projects.map((project) => project.identifier);
      currentBibleList.forEach((item) => {
        if (item.isset || identifiers.includes(item.identifier)) {
          item.isset = true;
        }
      });
    });
  }

  const issetCheck = JSON.stringify(currentBibleList) !== JSON.stringify(trueBibleList);

  const currentBook = (el, color = '') => {
    return (
      <button style={{ color: color }} onClick={() => onBook(el.identifier)}>
        {t(el.identifier)}
      </button>
    );
  };

  const renderBookList = (categories) => {
    return currentBibleList
      .filter((el) =>
        checkState
          ? el.categories === categories && el.isset === true
          : el.categories === categories
      )
      .map((el) => (
        <p key={el.sort}>
          {el.isset ? (
            el.identifier === referenceSelected.bookId ? (
              currentBook(el, 'blue')
            ) : (
              currentBook(el)
            )
          ) : (
            <span className={classes.falseElement}>{t(el.identifier)}</span>
          )}
        </p>
      ));
  };
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
      label={t('existing_books')}
    />
  ) : (
    []
  );

  return (
    <Projects>
      {hideCheckRender}
      <h2>{t('bible_NT')}</h2>
      <div>{renderBookList('bible-nt')}</div>
      <h2>{t('bible_OT')}</h2>
      <div>{renderBookList('bible-ot')}</div>
    </Projects>
  );
}

export default BookList;
