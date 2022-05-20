import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Box, Button, MenuItem, Select, Typography } from '@material-ui/core';
import { Card, FontSizeSlider } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';
import { useProjector, usePreview } from '@texttree/projector-mode-rcl';

import { AppContext, ReferenceContext } from '../../context';

import { langNames } from '../../config/materials';

const projectorLink = '/projector';

function CardSettings({ classes }) {
  const { t } = useTranslation();
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
  const {
    state: { referenceSelected },
  } = useContext(ReferenceContext);

  useEffect(() => {
    setData('bible', referenceSelected);
  }, [referenceSelected, setData]);

  const currentCards = useMemo(() => appConfig.lg.map((el) => el.i), [appConfig.lg]);

  const listItems = useMemo(
    () =>
      resourcesApp.filter((el) => {
        return currentCards?.includes(el.owner + '__' + el.name);
      }),
    [currentCards, resourcesApp]
  );

  const [selectedResource, setSelectedResource] = useState(() => {
    setData(listItems[0]);
    return listItems[0];
  });

  useEffect(() => {
    setData('resource', selectedResource);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResource]);

  const onClose = () => {
    setAppConfig((prev) => {
      const next = { ...prev };
      for (let k in next) {
        next[k] = next[k].filter((el) => el.i !== 'projector');
      }

      return next;
    });
  };

  const handleChange = (e) => {
    const currentValue = listItems.find((el) => el.id === e.target.value);
    if (currentValue) {
      setSelectedResource(currentValue);
    }
  };

  const [fontSizeValue, setFontSizeValue] = useState(() =>
    parseInt(getData('fontSize') ?? 0)
  );

  return (
    <Card
      closeable
      onClose={onClose}
      title={t('Projector_settings')}
      classes={classes}
      id={'projector'}
      fontSize={fontSize}
    >
      <Box>
        <Button
          variant="contained"
          color={isOpen ? 'secondary' : 'primary'}
          onClick={handleProjectorToggle}
        >
          {isOpen ? 'Close' : 'Open'} New Window
        </Button>
        <Typography>Choose resource from opened cards</Typography>
        <Select
          style={{ maxWidth: '100%' }}
          value={selectedResource.id}
          onChange={handleChange}
        >
          {listItems.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.title}
              {switchExtraTitleCard
                ? ' (' + langNames[el.languageId].eng + '|' + el.owner + ')'
                : ''}
            </MenuItem>
          ))}
        </Select>
        <Typography>Font Size</Typography>
        <Box mx={2}>
          <FontSizeSlider
            onChange={(e) => {
              setFontSizeValue(e);
              setData('fontSize', e);
            }}
            marks={false}
            max={500}
            min={50}
            step={10}
            value={fontSizeValue}
          />
        </Box>
        <Typography>4. Pre-default theme</Typography>
        <Typography>In progress... (background/text color)</Typography>
        <Typography>Preview</Typography>
        <Box
          style={{
            width: '320px',
            height: '180px',
            background: '#eee',
            border: '1px solid #ccc',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                transform: `scale(${scale})`,
              }}
            >
              <iframe
                ref={previewRef}
                title="Projector"
                style={{
                  border: 'none',
                  width: projectorWindowSize.width + 'px',
                  height: projectorWindowSize.height + 'px',
                  background: 'white',
                }}
                src={projectorLink}
              ></iframe>
            </div>
          </div>
        </Box>
      </Box>
    </Card>
  );
}

export default CardSettings;
