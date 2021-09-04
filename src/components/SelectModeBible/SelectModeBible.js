import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { ReferenceContext } from '../../context/ReferenceContext';
import { useSwitchModeBible } from '../../hooks/useSwitchModeBible';
import { FormControl, NativeSelect } from '@material-ui/core';
import { useStyles } from './style';

function SelectModeBible() {
  const options = ['OBS', 'Bible'];
  const { t } = useTranslation();

  const classes = useStyles();

  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const {
    state: { workspaceType },
    actions: { setWorkspaceType },
  } = useSwitchModeBible(goToBookChapterVerse, 'reference');

  const handleChange = (e) => {
    setWorkspaceType(e.target.value.toLowerCase());
  };
  console.log('workspaceType', workspaceType);
  return (
    <>
      <div>
        <FormControl className={classes.formControl}>
          <NativeSelect
            labelid="workSpace-select-label"
            disableUnderline={true}
            classes={{
              root: classes.root,
              icon: classes.icon,
              select: classes.select,
            }}
            onChange={handleChange}
            defaultValue={bookId !== 'obs' ? t('Bible') : t('OBS')}
          >
            {options.map((el) => (
              <option key={el} value={el}>
                {t(el)}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    </>
  );
}

export default SelectModeBible;
