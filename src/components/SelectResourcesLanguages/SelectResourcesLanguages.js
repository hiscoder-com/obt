import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  TextField,
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

  const handleChange = (event, value) => {
    setLanguageResources(value);
  };

  return (
    <div>
      <div>
        <FormControl className={classes.formControl}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={langs}
            getOptionLabel={(option) => option}
            value={languageResources}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                // label="Multiple values"
                placeholder="Favorites"
              />
            )}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default SelectResourcesLanguages;
