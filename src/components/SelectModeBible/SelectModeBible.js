import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { ReferenceContext } from '../../context/ReferenceContext';
import { switchModeBible } from '../../helper';
import { FormControl, NativeSelect } from '@material-ui/core';
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

  const initialSelectedValue = bookId === 'obs' ? 'obs' : 'bible';
  const [selectedValue, setSelectedValue] = React.useState(initialSelectedValue);
  React.useEffect(() => {
    if (bookId !== 'obs') {
      setSelectedValue('Bible');
    } else {
      setSelectedValue('OBS');
    }
  }, [bookId]);

  const handleChange = (e) => {
    const type = e.target.value.toLowerCase();
    console.log(type);
    switchModeBible(type, 'reference', goToBookChapterVerse);
  };

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
            value={selectedValue}
            // defaultValue={bookId !== 'obs' ? t('Bible') : t('OBS')}
          >
            {options.map((el) => (
              <option key={el.key} value={el.label} className={classes.option}>
                {t(el.label)}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    </>
  );
}

export default SelectModeBible;
