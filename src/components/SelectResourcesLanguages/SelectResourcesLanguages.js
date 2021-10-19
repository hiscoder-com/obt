import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Input,
  InputLabel,
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
    maxWidth: 300,
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
  const classes = useStyles();

  const [language, setLanguage] = React.useState([]);
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-checkbox-label">Languages</InputLabel>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={language}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {langs.map((lang) => (
              <MenuItem key={lang} value={lang}>
                <Checkbox checked={language.indexOf(lang) > -1} />
                <ListItemText primary={lang} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default SelectResourcesLanguages;
