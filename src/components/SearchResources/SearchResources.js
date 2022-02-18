import React, { useContext, useEffect, useState, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { AppContext, ReferenceContext } from '../../context';
import { SelectResourcesLanguages, DialogUI } from '../../components';
import {
  subjects,
  blackListResources,
  bibleSubjects,
  obsSubjects,
  langNames,
} from '../../config/materials';
import { defaultCard, server, columns } from '../../config/base';
import { getXY } from 'resource-workspace-rcl';
import { getUniqueResources, packageLangs } from '../../helper';
import { MenuItem, Menu, Button } from '@material-ui/core';

import LanguageIcon from '@material-ui/icons/Language';
import { useStyles, useAddStyles } from './style';

function SearchResources({ anchorEl, onClose, open }) {
  const {
    state: { appConfig, resourcesApp, languageResources },
    actions: { setAppConfig, setResourcesApp },
  } = useContext(AppContext);

  const {
    state: {
      referenceSelected: { bookId },
    },
  } = useContext(ReferenceContext);

  const { t } = useTranslation();
  const classes = useStyles();
  const addClasses = useAddStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const prevResources = useRef([]);
  const uniqueResources = getUniqueResources(appConfig, resourcesApp);
  const { enqueueSnackbar } = useSnackbar();
  const handleAddMaterial = (item) => {
    setAppConfig((prev) => {
      const next = { ...prev };
      for (let k in next) {
        const pos = getXY(appConfig[k], columns[k], defaultCard[k].h, defaultCard[k].w);
        next[k] = next[k].concat({
          ...defaultCard[k],
          x: pos.x,
          y: pos.y,
          i: item.owner + '__' + item.name,
        });
      }
      return next;
    });
    setTimeout(function () {
      document
        .querySelector('#' + item.owner + '__' + item.name + '_title')
        .scrollIntoView();
    }, 1000);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const findNewResources = (_prev, _result) => {
    if (_prev?.length > 0) {
      if (_result.length > _prev.length) {
        const result = [..._result];
        const prev = [..._prev];
        const flatPrev = prev.map((el) => el.id);
        return result.filter((res) => !flatPrev.includes(res.id));
      } else {
        return [];
      }
    }
  };

  useEffect(() => {
    axios
      .get(
        server +
          '/api/catalog/v5/search?limit=1000&sort=lang,title' +
          '&subject=' +
          subjects.join(',')
      )
      .then((res) => {
        const result = res.data.data
          .map((el) => {
            return {
              id: el.id,
              languageId: el.language,
              name: el.name,
              subject: el.subject,
              title: el.title,
              ref: el.branch_or_tag_name,
              owner: el.owner.toString().toLowerCase(),
              link: el.full_name + '/' + el.branch_or_tag_name,
            };
          })
          .filter(
            (el) =>
              !blackListResources.some(
                (value) =>
                  JSON.stringify(value) ===
                  JSON.stringify({ owner: el.owner, name: el.name })
              ) && languageResources.some((lang) => lang === el.languageId)
          );
        setResourcesApp((prev) => {
          if (prev && result) {
            prevResources.current = prev;
          }
          return result;
        });
      })
      .catch((err) => console.log(err));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageResources]);

  useEffect(() => {
    const newResources = findNewResources(prevResources.current, resourcesApp);
    if (newResources?.length > 0) {
      const listOBS = newResources.filter((res) =>
        obsSubjects.includes(res.subject)
      ).length;
      const listBible = newResources.filter((res) =>
        bibleSubjects.includes(res.subject)
      ).length;
      const list = `${t('Added_resources')}.
     ${listBible ? `${t('Bible')}: ${listBible}.` : ''}
    ${listOBS ? `${t('OBS')}: ${listOBS}.` : ''}`;

      enqueueSnackbar(list, { variant: 'info' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourcesApp]);

  let blockLang = '';
  const currentSubjects = bookId === 'obs' ? obsSubjects : bibleSubjects;
  const menuItems = uniqueResources
    .filter((el) => currentSubjects.includes(el.subject))
    .map((el) => {
      if (blockLang !== el.languageId) {
        blockLang = el.languageId;
        return (
          <div key={el.id}>
            <p className={classes.divider}>{packageLangs(langNames[el.languageId])}</p>
            <MenuItem className={classes.menu} onClick={() => handleAddMaterial(el)}>
              {el.title} ({el.owner})
            </MenuItem>
          </div>
        );
      } else {
        return (
          <MenuItem
            className={classes.menu}
            key={el.id}
            onClick={() => handleAddMaterial(el)}
          >
            {el.title} ({el.owner})
          </MenuItem>
        );
      }
    });

  const emptyMenuItems = <p className={classes.divider}>{t('No_resources')}</p>;

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Menu
        color="transparent"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={onClose}
      >
        <MenuItem button={false}>
          <Button
            onClick={handleOpenDialog}
            startIcon={<LanguageIcon size={'small'} />}
            classes={addClasses}
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
          >
            {t('Add_resource_languages')}
          </Button>
        </MenuItem>
        {menuItems.length !== 0 ? menuItems : emptyMenuItems}
      </Menu>
      <DialogUI
        title={t('Choose_languages_resources')}
        open={openDialog}
        onClose={handleCloseDialog}
        primary={{ text: t('Ok'), onClick: handleCloseDialog }}
      >
        <SelectResourcesLanguages />
      </DialogUI>
    </>
  );
}

export default SearchResources;
