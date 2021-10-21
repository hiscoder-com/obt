import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import { makeStyles } from '@material-ui/core/styles';
import {
  Input,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Chip,
} from '@material-ui/core';
import { langs } from '../../config/materials';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SelectResourcesLanguages() {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    state: { languageResources },
    actions: { setLanguageResources },
  } = useContext(AppContext);

  const handleChange = (event) => {
    setLanguageResources(event.target.value);
  };

  return (
    <div>
      <div>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={languageResources}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={t(value)} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {langs.map((lang) => (
              <MenuItem key={lang} value={lang}>
                <Checkbox checked={languageResources.indexOf(lang) > -1} />
                <ListItemText primary={t(lang)} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default SelectResourcesLanguages;
