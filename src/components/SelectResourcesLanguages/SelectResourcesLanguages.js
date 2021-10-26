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

  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      threshold: matchSorter.rankings.WORD_STARTS_WITH,
    });
  const getLanguageId = (appConfig) => {
    let oldAppConfig = JSON.parse(localStorage.getItem('appConfig'));
    const allValues = [...Object.values(oldAppConfig)];
    allValues.push(appConfig);
    let currentLangs = new Set();
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

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-standard"
        options={langs}
        filterOptions={filterOptions}
        getOptionLabel={(option) => t(option)}
        value={languageResources}
        onChange={(event, newValue) => {
          setLanguageResources([
            ...fixedOptions,
            ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
          ]);
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              key={option}
              label={t(option)}
              {...getTagProps({ index })}
              disabled={fixedOptions.indexOf(option) !== -1}
            />
          ))
        }
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </div>
  );
}

export default SelectResourcesLanguages;
