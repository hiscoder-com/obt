import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { ReferenceContext, AppContext } from '../../context';
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

  const {
    actions: { setAppConfig },
  } = useContext(AppContext);

  const initialSelectedValue = bookId === 'obs' ? 'obs' : 'bible';
  const [selectedValue, setSelectedValue] = React.useState(initialSelectedValue);
  React.useEffect(() => {
    if (bookId !== 'obs') {
      setSelectedValue('bible');
    } else {
      setSelectedValue('obs');
    }
  }, [bookId]);

  const handleChange = (e) => {
    const type = e.target.value;

    switchModeBible(type, goToBookChapterVerse, setAppConfig);
  };

  return (
    <>
      <div>
        <FormControl className={classes.formControl}>
          <NativeSelect
            labelid="workSpace-select-label"
            disableUnderline={true}
            classes={{
              icon: classes.icon,
              select: classes.select,
            }}
            onChange={handleChange}
            value={selectedValue}
          >
            {options.map((el) => (
              <option key={el.key} value={el.key} className={classes.option}>
                {t(el.label).toUpperCase()}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    </>
  );
}

export default SelectModeBible;
