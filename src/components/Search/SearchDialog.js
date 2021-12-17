import React, { useState, useEffect, useContext } from 'react';
import { DialogUI } from '..';
import SearchIcon from '@material-ui/icons/Search';

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
import Search from './Search';
import { ReferenceContext, AppContext } from '../../context';

const bookOptions = [
  { key: 'current', label: 'Current book' },
  { key: 'nt', label: 'New Testament' },
  { key: 'ot', label: 'Old Testament' },
  { key: 'select', label: 'Select book' },
];

function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState(null);
  const [resourcesBible, setResourcesBible] = useState([]);
  const [resourceSearch, setResourceSearch] = useState([]);
  const [optionsBible, setOptionsBible] = useState([]);
  const [clickOnWord, setClickOnWord] = useState(false);
  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const {
    state: { appConfig, resourcesApp },
  } = useContext(AppContext);
  const classes = useStyles();

  const onCloseDialogUI = () => {
    setOpen(false);
    setValue('');
  };
  const handleOpenDialogUI = () => {
    setOpen(true);
    setResourceSearch(resourcesBible[0]);
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setSearch(value);
    }
  };
  const handleClickWord = (word) => {
    setValue('');
    setTimeout(() => {
      setValue(word);
      setSearch(word);
    }, 1000);
  };
  const handleClickSearch = () => {
    setSearch(value);
  };

  const handleChangeBooks = (e) => {
    console.log(e.target.value);
  };
  const handleChangeResources = (e) => {
    setResourceSearch(JSON.parse(e.target.value));
    setValue('');
  };

  const handleChangeCheckBox = () => {
    setClickOnWord((prev) => !prev);
  };

  useEffect(() => {
    if (value === '') {
      setSearch(null);
    }
  }, [value]);
  useEffect(() => {
    const currentResources =
      resourcesApp &&
      appConfig &&
      resourcesApp.filter((e) => appConfig.lg.map((e) => e.i).includes(e.name));
    const _resources = currentResources.filter((e) => {
      return (
        /bible/.test(e.subject.toLowerCase()) || /testament/.test(e.subject.toLowerCase())
      );
    });
    setResourcesBible(_resources);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appConfig]);

  useEffect(() => {
    const options = resourcesBible.map((el) => {
      const { languageId, name, owner } = el;
      return (
        <option
          key={el.id}
          value={JSON.stringify({ languageId, name, owner })}
          className={classes.option}
        >
          {el.title}
        </option>
      );
    });
    setOptionsBible(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourcesBible]);

  return (
    <div>
      <Button
        color={'primary'}
        variant={'contained'}
        disableElevation={true}
        onClick={handleOpenDialogUI}
      >
        <SearchIcon className={classes.searchIcon} />
        Search
      </Button>

      <DialogUI open={open} onClose={onCloseDialogUI} title={' '}>
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <NativeSelect
              labelid="workSpace-select-label"
              disableUnderline={true}
              onChange={handleChangeResources}
            >
              {optionsBible}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <NativeSelect
              labelid="workSpace-select-label"
              disableUnderline={true}
              onChange={handleChangeBooks}
            >
              {bookOptions.map((el) => (
                <option key={el.key} value={el.key} className={classes.option}>
                  {el.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <TextField
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => {
              setSearch(null);
              setValue(e.target.value);
            }}
            onKeyPress={(e) => handleKeyPress(e)}
            value={value}
          />
          <Button color={'primary'} disableElevation={true} onClick={handleOpenDialogUI}>
            <SearchIcon onClick={handleClickSearch} className={classes.searchIcon} />
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={clickOnWord}
                onChange={handleChangeCheckBox}
                color="primary"
              />
            }
            label="Search by word"
          />
          <Divider className={classes.divider} />
          {search ? (
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
            />
          ) : null}
        </div>
      </DialogUI>
    </div>
  );
}

export default SearchDialog;
