import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormControl, Chip } from '@material-ui/core';
import { langs } from '../../config/materials';
import { defaultTplBible, defaultTplOBS } from '../../config/base';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function SelectResourcesLanguages() {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    state: { languageResources, appConfig },
    actions: { setLanguageResources },
  } = useContext(AppContext);
  console.log({ appConfig });
  const getLanguageId = (appConfig) => {
    let oldAppConfig = JSON.parse(localStorage.getItem('appConfig'));
    const allValues = [
      ...Object.values(oldAppConfig),
      ...Object.values(defaultTplOBS),
      ...Object.values(defaultTplBible),
    ];
    allValues.push(appConfig);
    let currentLangs = new Set();
    if (appConfig && allValues) {
      allValues.forEach((value) => {
        value.lg.forEach((el) => {
          currentLangs.add(el.i.split('_')[0]);
        });
      });
    }
    return Array.from(currentLangs);
  };

  const fixedOptions = getLanguageId(appConfig);

  return (
    <div>
      <div>
        <FormControl className={classes.formControl}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={langs}
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
        </FormControl>
      </div>
    </div>
  );
}

export default SelectResourcesLanguages;
