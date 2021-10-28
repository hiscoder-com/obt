import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import { matchSorter } from 'match-sorter';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Chip } from '@material-ui/core';
import { langs } from '../../config/materials';

function SelectResourcesLanguages() {
  const { t } = useTranslation();

  const {
    state: { languageResources, appConfig, currentLanguage },
    actions: { setLanguageResources },
  } = useContext(AppContext);

  const filterOptions = (options, { inputValue }) => {
    return matchSorter(options, inputValue, {
      keys: ['title', 'id'],
      threshold: matchSorter.rankings.WORD_STARTS_WITH,
    });
  };

  // круто сделал
  const getLanguageId = (appConfig) => {
    let oldAppConfig = JSON.parse(localStorage.getItem('appConfig'));
    const allValues = [...Object.values(oldAppConfig)];
    allValues.push(appConfig);
    let currentLangs = new Set();
    // нужно ли тут проверять appConfig если мы его добавили в allValues
    if (appConfig && allValues) {
      allValues.forEach((value) => {
        value.lg.forEach((el) => {
          currentLangs.add(el.i.split('_')[0]);
        });
      });
    }
    currentLangs.add(currentLanguage);
    return Array.from(currentLangs);
  };

  const fixedOptions = getLanguageId(appConfig);

  let options = [];
  langs.forEach((el) => {
    options.push({ title: t(el), id: el });
  });

  let value = [];
  languageResources.forEach((el) => {
    value.push({ title: t(el), id: el });
  });

  return (
    <div>
      <Autocomplete
        multiple
        options={options}
        filterSelectedOptions={true}
        filterOptions={filterOptions}
        getOptionLabel={(option) => option.title}
        value={value}
        getOptionSelected={(option, value) => option.id === value.id}
        onChange={(event, newValue) => {
          const _languageResources = [
            ...fixedOptions,
            ...newValue
              .filter((option) => fixedOptions.indexOf(option.id) === -1)
              .map((el) => el.id),
          ];
          setLanguageResources(_languageResources);
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              key={option.id}
              label={t(option.title)}
              {...getTagProps({ index })}
              disabled={fixedOptions.indexOf(option.id) !== -1}
            />
          ))
        }
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </div>
  );
}

export default SelectResourcesLanguages;
