import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import { matchSorter } from 'match-sorter';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Chip } from '@material-ui/core';
import { langs } from '../../config/materials';

import { getLanguageIds } from '../../helper';

function SelectResourcesLanguages() {
  const { t } = useTranslation();

  const {
    state: { languageResources, appConfig },
    actions: { setLanguageResources },
  } = useContext(AppContext);

  const filterOptions = (options, { inputValue }) => {
    return matchSorter(options, inputValue, {
      keys: ['title', 'id'],
      threshold: matchSorter.rankings.WORD_STARTS_WITH,
    });
  };

  const fixedOptions = getLanguageIds(appConfig);

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
