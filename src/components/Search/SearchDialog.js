import React, { useState, useEffect } from 'react';
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
import ProscommaSearch from './ProscommaSearch';
import { ReferenceContext, AppContext } from '../../context';
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
  } = React.useContext(ReferenceContext);

  const {
    state: { appConfig, resourcesApp },
  } = React.useContext(AppContext);

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

  const classes = useStyles();
  const bookOptions = [
    { key: 'current', label: 'Current book' },
    { key: 'nt', label: 'New Testament' },
    { key: 'ot', label: 'Old Testament' },
    { key: 'select', label: 'Select book' },
  ];

  const onClose = () => {
    setOpen(false);
    setValue('');
  };
  const handleOpen = () => {
    setOpen(true);
    setResourceSearch(resourcesBible[0]);
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      if (search !== value) {
        setSearch(null);
        setSearch(value);
      }
    }
  };
  const handleSearch = () => {
    setSearch(value);
  };
  useEffect(() => {
    if (value === '') {
      setSearch(null);
    }
  }, [value]);
  const handleClose = () => {
    setValue('');
    setOpen(false);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const handleChangeResources = (e) => {
    setResourceSearch(JSON.parse(e.target.value));
    setValue('');
  };
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

  const handleClickWord = (word) => {
    setValue('');
    setTimeout(() => {
      setValue(word);
      setSearch(word);
    }, 1000);
  }; /** TODO решить проблему с ассинхронностью и сапуском поиска.
  Сейчас, чтобы запусить поиск заново, мне нужно обнулить setSearch либо очистить опле ввода,
  тогда опять работает эта операция setSearch(null) - 63 строка, тогда запустится заново ProscommaSearch.
  а я бы хотел ввести слобо благо, потом дождаться поиска, изменить пару букв и запустить заново, так не работает
  */

  const handleChangeCheck = () => {
    setClickOnWord((prev) => !prev);
  };
  return (
    <div>
      <Button
        color={'primary'}
        variant={'contained'}
        disableElevation={true}
        onClick={handleOpen}
      >
        <SearchIcon style={{ fontSize: 20 }} />
        Search
      </Button>

      <DialogUI open={open} onClose={onClose} title={' '}>
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <NativeSelect
              labelid="workSpace-select-label"
              disableUnderline={true}
              classes={{
                icon: classes.icon,

                select: classes.select,
              }}
              onChange={handleChangeResources}
            >
              {optionsBible}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <NativeSelect
              labelid="workSpace-select-label"
              disableUnderline={true}
              classes={{
                icon: classes.icon,

                select: classes.select,
              }}
              onChange={handleChange}
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
              setValue(e.target.value);
            }}
            onKeyPress={(e) => handleKeyPress(e)}
            value={value}
          />
          <Button color={'primary'} disableElevation={true} onClick={handleOpen}>
            <SearchIcon onClick={handleSearch} style={{ fontSize: 20 }} />
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={clickOnWord}
                onChange={handleChangeCheck}
                color="primary"
              />
            }
            label="Search by word"
          />
          <Divider style={{ marginTop: '10px' }} />
          {search ? (
            <ProscommaSearch
              referenceSelected={referenceSelected}
              setValue={setValue}
              setSearch={setSearch}
              searchText={search}
              open={open}
              handleClose={handleClose}
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
