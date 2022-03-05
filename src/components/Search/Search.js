import React, { useState, useEffect } from 'react';

import { DialogUI } from '..';
import SearchIcon from '@material-ui/icons/Search';
import { useFetchUsfm } from '@texttree/search-proskomma-rcl';
import {
  FormControl,
  NativeSelect,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useStyles } from './style';

function Search() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [startSearch, setStartSearch] = useState(false);
  const classes = useStyles();

  const owner = 'ru_gl';
  const repo = 'ru_rob';
  const server = 'git.door43.org';
  const bookCodes = ['mat', 'rut', '1ti', 'gen'];
  const _bookCodes = startSearch ? bookCodes : [];
  const { usfms } = useFetchUsfm({
    owner,
    repo,
    server,
    bookCodes: _bookCodes,
  });
  const handleStartSearch = () => {
    setStartSearch(true);
  };
  useEffect(() => {
    console.log(startSearch, _bookCodes);
    if (usfms && usfms.length > 0) console.log(usfms);
  }, [usfms, startSearch]);

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
          <TextField
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onBlur={(e) => {
              console.log(e.target.value);
              setValue(e.target.value);
            }}
          />
          <Button color={'primary'} disableElevation={true} onClick={handleStartSearch}>
            <SearchIcon className={classes.searchIcon} />
          </Button>

          <Divider className={classes.divider} />
          {/* {search && usfm && documents ? (
            <Search
              referenceSelected={referenceSelected}
              setValue={setValue}
              setSearch={setSearch}
              searchText={search}
              open={open}
              handleCloseDialogUI={onCloseDialogUI}
              resourceSearch={resourceSearch}
              goToBookChapterVerse={goToBookChapterVerse}
              handleClickWord={handleClickWord}
              clickOnWord={clickOnWord}
              usfm={usfm}
              searchBookCodes={searchBookCodes}
              documents={documents}
            />
          ) : null} */}
        </div>
      </DialogUI>
    </>
  );
}

export default Search;
