import React, { useContext, useState, useEffect } from 'react';

import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ReferenceContext, AppContext } from '../../context';

import { switchModeBible } from '../../helper';

import { useStyles } from './style';

function SelectModeBible() {
  const options = [
    { key: 'obs', label: 'OBS' },
    { key: 'bible', label: 'Bible' },
  ];
  const { t } = useTranslation();

  const classes = useStyles();

  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const {
    actions: { setAppConfig },
  } = useContext(AppContext);

  const initialSelectedValue = bookId === 'obs' ? 'obs' : 'bible';
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);
  useEffect(() => {
    setSelectedValue(bookId === 'obs' ? 'obs' : 'bible');
  }, [bookId]);

  const handleChange = (e) => {
    const type = e.target.value;
    switchModeBible(type, goToBookChapterVerse, setAppConfig);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        disableUnderline={true}
        classes={{
          icon: classes.icon,
          select: classes.select,
        }}
        onChange={handleChange}
        value={selectedValue}
      >
        {options.map((el) => (
          <MenuItem key={el.key} value={el.key}>
            {t(el.label).toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectModeBible;
