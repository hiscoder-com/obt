import React, { useContext } from 'react';

import { AppContext } from '../../context';
import { matchSorter } from 'match-sorter';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Chip } from '@material-ui/core';
import { langNames } from '../../config/materials';

import { getLanguageIds, packageLangs } from '../../helper';

function SelectResourcesLanguages() {
  const {
    state: { languageResources },
    actions: { setLanguageResources },
  } = useContext(AppContext);

  const filterOptions = (options, { inputValue }) => {
    return matchSorter(options, inputValue, {
      keys: ['title', 'eng', 'id'],
      threshold: matchSorter.rankings.WORD_STARTS_WITH,
    });
  };

  const fixedOptions = getLanguageIds();

  let options = [];
  for (let key in langNames) {
    options.push({
      title: packageLangs(langNames[key]),
      id: key,
      eng: langNames[key].eng,
    });
  }

  let value = [];
  languageResources.forEach((el) => {
    value.push({
      title: packageLangs(langNames[el]),
      id: el,
      eng: langNames[el].eng,
    });
  });

  const onChange = (event, newValue) => {
    console.log({ newValue });
    const _languageResources = [
      ...fixedOptions,
      ...newValue
        .filter((option) => fixedOptions.indexOf(option.id) === -1)
        .map((el) => el.id),
    ];
    setLanguageResources(_languageResources);
  };

  const renderTags = (tagValue, getTagProps) =>
    tagValue.map((option, index) => (
      <Chip
        key={option.id}
        label={option.title}
        {...getTagProps({ index })}
        disabled={fixedOptions.indexOf(option.id) !== -1}
      />
    ));

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
        onChange={onChange}
        renderTags={renderTags}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </div>
  );
}

export default SelectResourcesLanguages;
