import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Box, Button, MenuItem, Select, Typography } from '@material-ui/core';
import { Card, FontSizeSlider } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';
import { useProjector, usePreview } from '@texttree/projector-mode-rcl';

import { AppContext } from '../../context';

import { langNames } from '../../config/materials';

import { useStyles } from './cardStyle';

const projectorLink = '/projector';

function CardSettings({ classes }) {
  const { t } = useTranslation();
  const cardClasses = useStyles();
  const { setData, getData } = useProjector();
  const { handleProjectorToggle, isOpen, projectorWindowSize, previewRef, scale } =
    usePreview({
      projectorLink,
      defaultProjectorSize: { height: 540, width: 960 },
      defaultPreviewSize: { width: 180, height: 320 },
    });

  const {
    state: { fontSize, resourcesApp, appConfig, switchExtraTitleCard },
    actions: { setAppConfig },
  } = useContext(AppContext);

  const openedCards = useMemo(() => appConfig.lg.map((el) => el.i), [appConfig.lg]);

  const listOfOpenedResources = useMemo(
    () =>
      resourcesApp.filter((el) => {
        return openedCards?.includes(el.owner + '__' + el.name);
      }),
    [openedCards, resourcesApp]
  );

  useEffect(() => {
    if (!listOfOpenedResources.find((el) => el.id === selectedResource?.id)) {
      setSelectedResource(listOfOpenedResources[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedCards]);

  const [selectedResource, setSelectedResource] = useState(() => {
    setData('resource', listOfOpenedResources[0]);
    return listOfOpenedResources[0];
  });

  useEffect(() => {
    setData('resource', selectedResource);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResource]);

  const onCloseSettingsCard = () => {
    setAppConfig((prev) => {
      const next = { ...prev };
      for (let k in next) {
        next[k] = next[k].filter((el) => el.i !== 'projector');
      }

      return next;
    });
  };

  const handleChangeSelect = (e) => {
    const currentValue = listOfOpenedResources.find((el) => el.id === e.target.value);
    if (currentValue) {
      setSelectedResource(currentValue);
    }
  };

  const [fontSizeProjector, setFontSizeProjector] = useState(() =>
    parseInt(getData('fontSize') ?? 0)
  );

  const handleFontSizeChange = (e) => {
    setFontSizeProjector(e);
    setData('fontSize', e);
  };

  return (
    <Card
      closeable
      onClose={onCloseSettingsCard}
      title={t('Projector_settings')}
      classes={classes}
      id={'projector'}
      fontSize={fontSize}
    >
      <Box className={cardClasses.settingsWrap}>
        <Typography variant="subtitle2">{t('Choose_resource')}</Typography>
        <Select
          className={cardClasses.select}
          value={selectedResource.id}
          onChange={handleChangeSelect}
        >
          {listOfOpenedResources.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.title}
              {switchExtraTitleCard
                ? ' (' + langNames?.[el.languageId]?.eng + '|' + el.owner + ')'
                : ''}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="subtitle2">{t('Preview')}</Typography>
        <Box className={cardClasses.boxWrap}>
          <div className={cardClasses.iframeWrap}>
            <div
              style={{
                position: 'absolute',
                transform: `scale(${scale})`,
              }}
            >
              <iframe
                ref={previewRef}
                title="Projector"
                className={cardClasses.iframe}
                style={{
                  width: projectorWindowSize.width + 'px',
                  height: projectorWindowSize.height + 'px',
                }}
                src={projectorLink}
              ></iframe>
            </div>
          </div>
        </Box>
        <Typography variant="subtitle2">{t('Font_size')}</Typography>
        <Box className={cardClasses.fontWrap}>
          <FontSizeSlider
            onChange={handleFontSizeChange}
            marks={false}
            max={500}
            min={50}
            step={10}
            value={fontSizeProjector}
          />
        </Box>
        <Button
          variant="contained"
          color={isOpen ? 'secondary' : 'primary'}
          onClick={handleProjectorToggle}
        >
          {isOpen ? t('Close') : t('Open')} {t('New_window')}
        </Button>
      </Box>
    </Card>
  );
}

export default CardSettings;
