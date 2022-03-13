import React, { useState, useEffect, useContext } from 'react';

import { DialogUI } from '..';
import SearchIcon from '@material-ui/icons/Search';
import { useFetchUsfm, useSearch } from '@texttree/search-proskomma-rcl';
import {
  FormControl,
  NativeSelect,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useStyles } from './style';
import { AppContext, ReferenceContext } from '../../context';
import useCurrentResource from './useCurrentResource';

function Search() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  // const [documents, setDocuments] = useState([]);
  const [startSearch, setStartSearch] = useState(false);
  const [resourceSearch, setResourceSearch] = useState();

  const {
    state: { appConfig, resourcesApp },
  } = useContext(AppContext);
  const { optionsBible } = useCurrentResource({ appConfig, resourcesApp });
  if (optionsBible) {
    console.log({ optionsBible });
  }
  const classes = useStyles();

  const owner = 'ru_gl';
  const repo = 'ru_rlob';
  const server = 'git.door43.org';
  const bookCodes = ['rut'];

  const _bookCodes = startSearch ? bookCodes : [];

  // const _repo = startFetch ? repo : '';
  const { usfms } = useFetchUsfm({
    owner,
    repo,
    server,
    bookCodes: _bookCodes,
  });
  const _docSetId = 'ru_gl/ru_rlob';
  const docSetId = startSearch ? _docSetId : '';

  const verbose = true;
  const searchText = value;

  const documents = usfms &&
    startSearch && [
      {
        selectors: {
          org: 'ru_gl',
          lang: 'ru',
          abbr: 'rlob',
        },
        data: usfms['rut'],
        bookCode: 'rut',
      },
    ];
  const { dataArray } = useSearch({ documents, searchText, docSetId, verbose });
  const handleStartSearch = () => {
    setStartSearch(true);
  };
  const handleChangeResources = (e) => {
    setResourceSearch(JSON.parse(e.target.value));
    setStartSearch(false);
  };
  console.log({ dataArray });
  if (resourceSearch) console.log({ resourceSearch });
  // useEffect(() => {
  //   if (usfms && startSearch) {
  //     const _documents =
  //       resourceSearch &&
  //       bookCodes.map((el) => {
  //         return {
  //           selectors: {
  //             org: resourceSearch.owner,
  //             lang: resourceSearch.languageId,
  //             abbr: resourceSearch.name.split('_')[1],
  //           },
  //           data: usfms[el],
  //           bookCode: el,
  //         };
  //       });
  //     setDocuments(_documents);
  //   }
  // }, [usfms, startSearch]);

  return (
    <>
      <Button
        color={'primary'}
        variant={'contained'}
        disableElevation={true}
        onClick={() => setOpen(true)}
        style={{ marginLeft: '10px' }}
      >
        <SearchIcon className={classes.searchIcon} />
        Search
      </Button>

      <DialogUI open={open} onClose={() => setOpen(false)} title={' '}>
        <div className={classes.root}>
          {optionsBible && optionsBible.length > 0 && (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChangeResources}
              defaultValue={optionsBible[0]}
            >
              {optionsBible.length > 0 ? optionsBible : []}
            </Select>
          )}
          <TextField
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onBlur={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button color={'primary'} disableElevation={true} onClick={handleStartSearch}>
            <SearchIcon className={classes.searchIcon} />
            klk
          </Button>

          <Divider className={classes.divider} />
        </div>
      </DialogUI>
    </>
  );
}

export default Search;
