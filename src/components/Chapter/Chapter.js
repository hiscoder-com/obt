import React, { useState, useMemo, useEffect } from 'react';
import { Card } from 'translation-helps-rcl';
import { Verse, ResourcesContext } from 'scripture-resources-rcl';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../App.context';
import { Menu, MenuItem } from '@material-ui/core';

import { resourcesList } from '../../config';

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

export default function Chapter({ title, classes, onClose, type, reference }) {
  const { t } = useTranslation();
  const [contextReference, setContextReference] = React.useState();
  const [position, setPosition] = React.useState(initialPosition);
  const { state } = React.useContext(ResourcesContext);
  const { actions } = React.useContext(AppContext);
  const { setType, setQuote, setShowErrorReport } = actions;

  let project = useMemo(() => {}, []);

  const handleContextOpen = (event, ref) => {
    event.preventDefault();
    setPosition({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
    setContextReference(ref);
  };

  const handleContextClose = () => {
    setPosition(initialPosition);
  };

  const handleOpenError = () => {
    setShowErrorReport(true);
    setPosition(initialPosition);
  };

  const [chapter, setChapter] = useState();
  const [verses, setVerses] = useState();

  const resource = resourcesList[type];

  if (state?.resources) {
    state.resources.forEach((el) => {
      if (el.resourceId === resource.resourceId && el.username === resource.owner) {
        project = el.project;
      }
    });
  }

  useEffect(() => {
    if (project && Object.keys(project).length !== 0) {
      project.parseUsfm().then(
        (result) => {
          if (Object.keys(result.chapters).length > 0) {
            setChapter(result.chapters[reference.chapter]);
          } else {
            console.log('Book not found');
          }
        },
        (error) => console.log(error)
      );
    } else {
      // Book could not be found in this translation:
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
          onClick={() => {
            console.log({ ...reference, type, verse: key });
            setQuote(verseObjects[0].text || verseObjects[0].content);
            setType(type);
          }}
          onContextMenu={(e) => handleContextOpen(e, { ...reference, type, verse: key })}
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
  }, [chapter, reference, type, setType, setQuote]);

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
        anchorPosition={
          position.mouseY !== null && position.mouseX !== null
            ? { top: position.mouseY, left: position.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleContextClose}>
          {contextReference?.type} {contextReference?.bookId} {contextReference?.chapter}:
          {contextReference?.verse}
        </MenuItem>
        <MenuItem onClick={handleContextClose}>Copy Link</MenuItem>
        <MenuItem onClick={handleOpenError}>Send Error</MenuItem>
      </Menu>
      {chapter ? verses : t('Loading')}
    </Card>
  );
}
