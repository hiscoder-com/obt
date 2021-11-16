import React, { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { AppContext, ReferenceContext } from '../../context';
import { DialogUI } from '../DialogUI';
import {
  subjects,
  owners,
  blackListResources,
  bibleSubjects,
  obsSubjects,
} from '../../config/materials';
import { defaultCard, server, columns } from '../../config/base';
import { getXY } from 'resource-workspace-rcl';
import { getUniqueResources } from '../../helper';
import { SelectResourcesLanguages } from '../SelectResourcesLanguages';
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

  const uniqueResources = getUniqueResources(appConfig, resourcesApp);

  const handleAddMaterial = (item) => {
    setAppConfig((prev) => {
      const next = { ...prev };
      for (let k in next) {
        const pos = getXY(appConfig[k], columns[k], defaultCard[k].h, defaultCard[k].w);
        next[k] = next[k].concat({
          ...defaultCard[k],
          x: pos.x,
          y: pos.y,
          i: item.name,
        });
      }
      return next;
    });
    setTimeout(function () {
      document.querySelector('#' + item.name + '_title').scrollIntoView();
    }, 1000);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    axios
      .get(
        server +
          '/api/catalog/v5/search?limit=1000&sort=lang,title&owner=' +
          owners.join(',') +
          '&lang=' +
          languageResources.join(',') +
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
              ref: el.default_branch,
              owner: el.owner.toString().toLowerCase(),
              link: el.full_name + '/' + el.default_branch,
            };
          })
          .filter(
            (el) =>
              !blackListResources.some(
                (value) =>
                  JSON.stringify(value) ===
                  JSON.stringify({ owner: el.owner, name: el.name })
              )
          );
        setResourcesApp(result);
      })
      .catch((err) => console.log(err));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageResources]);
  let blockLang = '';
  const currentSubjects = bookId === 'obs' ? obsSubjects : bibleSubjects;
  const menuItems = uniqueResources
    .filter((el) => currentSubjects.includes(el.subject))
    .map((el) => {
      if (blockLang !== el.languageId) {
        blockLang = el.languageId;
        return (
          <div key={el.id}>
            <p className={classes.divider}>{t(el.languageId)}</p>
            <MenuItem className={classes.menu} onClick={() => handleAddMaterial(el)}>
              {el.title}
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
            {el.title}
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
        title={{ text: t('Choose_languages_resources') }}
        open={openDialog}
        onClose={handleCloseDialog}
        buttons={[
          {
            label: t('Apply'),
            variant: 'contained',
            color: 'primary',
            onClick: handleCloseDialog,
          },
        ]}
      >
        <SelectResourcesLanguages />
      </DialogUI>
    </>
  );
}

export default SearchResources;
