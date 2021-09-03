import React, { useContext, useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { ReferenceContext } from '../../context/ReferenceContext';
import { saveToClipboard } from '../../helper';
import { FormControl, NativeSelect } from '@material-ui/core';
import { useStyles } from './style';
import { getAbbr } from '../../config/base';

function ShowReference() {
  const { t } = useTranslation();

  const classes = useStyles();
  const [workspaceType, setWorkspaceType] = useState();

  const {
    state: {
      referenceSelected: { bookId, chapter, verse },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);
  const abbr = getAbbr(bookId, 'ru');
  const showReference2 = `  ${
    bookId !== 'obs' ? abbr + ' ' + chapter + ':' + verse : chapter + ':' + verse
  }`;
  const handleToClipboard = () => saveToClipboard(showReference2);

  const handleOpenBible = () => {
    const curRef = JSON.parse(localStorage.getItem('reference'))['bible'];
    goToBookChapterVerse(curRef.bookId, curRef.chapter, curRef.verse);
  };

  const handleOpenOBS = () => {
    const curRef = JSON.parse(localStorage.getItem('reference'))['obs'];
    goToBookChapterVerse(curRef.bookId, curRef.chapter, curRef.verse);
  };
  useEffect(() => {
    let cleanup = false;
    switch (workspaceType) {
      case 'OBS':
        if (!cleanup) handleOpenOBS();
        break;
      case 'Bible':
        if (!cleanup) handleOpenBible();
        break;
      default:
        break;
    }
    return () => {
      cleanup = true;
    };
  }, [workspaceType]);

  const handleChange = (e) => {
    setWorkspaceType(e.target.value);
  };

  return (
    <>
      <div onClick={handleToClipboard} style={{ display: 'flex' }}>
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
              <option>{t('OBS')}</option>
              <option>{t('Bible')}</option>
            </NativeSelect>
          </FormControl>
        </div>

        <div>{showReference2}</div>
      </div>
    </>
  );
}

export default ShowReference;
