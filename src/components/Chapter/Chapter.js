import React, { useState, useMemo, useEffect } from 'react';

import { Card } from 'translation-helps-rcl';
import { Verse, ResourcesContext } from 'scripture-resources-rcl';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';
import { getVerseText } from '../../helper';

import { Menu, MenuItem } from '@material-ui/core';

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

export default function Chapter({ title, classes, onClose, type, reference }) {
  const { t } = useTranslation();

  const [position, setPosition] = React.useState(initialPosition);
  const { state } = React.useContext(ResourcesContext);
  const {
    state: { resourcesApp },
    actions: { setShowErrorReport, setReferenceBlock },
  } = React.useContext(AppContext);

  const [chapter, setChapter] = useState();
  const [verses, setVerses] = useState();

  let project = useMemo(() => {}, []);

  const handleContextOpen = (event) => {
    event.preventDefault();
    setPosition({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleContextClose = () => {
    setPosition(initialPosition);
  };

  const handleOpenError = () => {
    setShowErrorReport(true);
    setPosition(initialPosition);
  };

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  if (state?.resources) {
    state.resources.forEach((el) => {
      if (
        el.repository === resource.name &&
        el.username.toString().toLowerCase() === resource.owner.toString().toLowerCase()
      ) {
        project = el.project;
        console.log(el);
        debugger;
      }
    });
  }

  useEffect(() => {
    if (project && Object.keys(project).length !== 0) {
      project
        .parseUsfm()
        .then((result) => {
          console.log({ result: result });
          if (Object.keys(result.json.chapters).length > 0) {
            setChapter(result.json.chapters[reference.chapter]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setChapter(null);
    }
  }, [project, reference.chapter]);

  useEffect(() => {
    let _verses = [];
    for (let key in chapter) {
      if (parseInt(key).toString() !== key.toString()) {
        continue;
      }
      const { verseObjects } = chapter[key];

      const verse = (
        <span
          className="verse"
          key={key}
          onContextMenu={(e) => {
            setReferenceBlock({
              ...reference,
              type,
              verse: key,
              text: getVerseText(verseObjects),
            });
            handleContextOpen(e);
          }}
          style={{ cursor: 'context-menu' }}
        >
          <Verse
            verseKey={key}
            verseObjects={verseObjects}
            paragraphs={false}
            showUnsupported={false}
            disableWordPopover={false}
            reference={{ ...reference, verse: key }}
            renderOffscreen={false}
          />
        </span>
      );

      _verses.push(verse);
    }
    setVerses(_verses);
  }, [chapter, reference, type, setReferenceBlock]);
  const anchorPosition =
    position.mouseY !== null && position.mouseX !== null
      ? { top: position.mouseY, left: position.mouseX }
      : undefined;

  return (
    <Card
      closeable
      onClose={() => onClose(type)}
      title={title}
      type={type}
      classes={classes}
    >
      <Menu
        keepMounted
        open={position.mouseY !== null}
        onClose={handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        <MenuItem onClick={handleOpenError}>{t('Error_report')}</MenuItem>
      </Menu>
      {chapter ? verses : t('No_content')}
    </Card>
  );
}
