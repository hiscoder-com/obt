import React, { useState, useEffect } from 'react';
import { DialogUI } from '..';
import SearchIcon from '@material-ui/icons/Search';

import { FormControl, NativeSelect, Button, Divider, TextField } from '@material-ui/core';

import { useStyles } from './style';
import ProscommaSearch from './ProscommaSearch';
import { ReferenceContext, AppContext } from '../../context';
function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState(null);

  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = React.useContext(ReferenceContext);

  const {
    state: { appConfig, resourcesApp },
  } = React.useContext(AppContext);

  const currentResources =
    resourcesApp &&
    appConfig &&
    resourcesApp.filter((e) => appConfig.lg.map((e) => e.i).includes(e.name));

  const { languageId, name, owner } = currentResources && currentResources[0];
  /** TODO
   * Нужно подумать - как организовать поиск в нескольких ресурсах. Я здесь беру значения первого в массиве
   */

  const classes = useStyles();
  const options = [
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
              onChange={handleChange}
            >
              {options.map((el) => (
                <option key={el.key} value={el.key} className={classes.option}>
                  {el.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <TextField
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
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
          <Divider style={{ marginTop: '10px' }} />
          {search ? (
            <ProscommaSearch
              referenceSelected={referenceSelected}
              setValue={setValue}
              setSearch={setSearch}
              searchText={search}
              open={open}
              handleClose={handleClose}
              languageId={languageId}
              name={name}
              owner={owner}
              goToBookChapterVerse={goToBookChapterVerse}
              dialog
              handleClickWord={handleClickWord}
            />
          ) : null}
        </div>
      </DialogUI>
    </div>
  );
}

export default SearchDialog;
