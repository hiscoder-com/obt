import React, { /*useContext,*/ useEffect, useState } from 'react';

//import { useTranslation } from 'react-i18next';
//import { ResourcesContext } from 'scripture-resources-rcl';

import axios from 'axios';

//import { AppContext } from '../../App.context';
import { langs, subjects } from './config';

import { MenuItem } from '@material-ui/core';

import { useStyles } from './style';

function SearchResources() {
  //  const { state } = useContext(ResourcesContext);
  //  const {
  //    state: { referenceSelected },
  //    actions,
  //  } = useContext(AppContext);

  //const { t } = useTranslation();
  const classes = useStyles();

  const [currentLang] = useState(langs[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resources, setResources] = useState([]);
  /*'https://git.door43.org/api/catalog/v5/search?owner=Door43-Catalog&includeMetadata=true&showIngredients=true&sort=title&limit=50&page=' +
          currentPage*/
  useEffect(() => {
    axios
      .get(
        'https://git.door43.org/api/v1/repos/search?owner=Door43-catalog&page=' +
          currentPage
      )
      .then((res) => {
        const result = res.data.data.map((el) => {
          return {
            id: el.id,
            language: el.language,
            name: el.name,
            subject: el.subject,
            title: el.title,
            //metadata_json_url: el.metadata_json_url,
            //books: el.books,
            //ingredients: el.ingredients,
          };
        });
        setResources(
          result.filter(
            (el) =>
              el.language !== '' &&
              langs.includes(el.language) &&
              el.subject !== '' &&
              subjects.includes(el.subject)
          )
        );
      })
      .catch((err) => console.log(err));
    return () => {};
  }, [currentLang, currentPage]);

  const handleClick = () => {
    setCurrentPage((old) => parseInt(old) + 1);
  };

  return (
    <>
      {resources.map((el) => (
        <MenuItem key={el.id} classes={classes} onClick={handleClick}>
          {el.language} - {el.title}
        </MenuItem>
      ))}
    </>
  );
}

export default SearchResources;
