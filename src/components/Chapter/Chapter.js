import React, { useState, useEffect, useContext, useRef } from 'react';

import { Card } from 'translation-helps-rcl';
import { Verse, ResourcesContext } from 'scripture-resources-rcl';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { AppContext } from '../../context/AppContext';
import { ReferenceContext } from '../../context/ReferenceContext';
import { getVerseText } from '../../helper';

import { Menu, MenuItem } from '@material-ui/core';

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

export default function Chapter({ title, classes, onClose, type, reference }) {
  const { t } = useTranslation();
  const verseRef = useRef([]);

  const [position, setPosition] = React.useState(initialPosition);
  const { state } = React.useContext(ResourcesContext);
  const {
    state: { resourcesApp, fontSize, introContextMenuOpen },
    actions: { setShowErrorReport },
  } = useContext(AppContext);

  const {
    state: { referenceBlock },
    actions: { goToBookChapterVerse, setReferenceBlock },
  } = useContext(ReferenceContext);

  const [chapter, setChapter] = useState();
  const [verses, setVerses] = useState();
  const [project, setProject] = useState({});
  const [resource, setResource] = useState(false);
  const [introContextMenuPosition, setIntroContextMenuPosition] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    resourcesApp.forEach((el) => {
      if (el.name === type) {
        setResource(el);
      }
    });
  }, [resourcesApp, type]);

  const resources = state?.resources;
  useEffect(() => {
    if (resources) {
      resources.forEach((el) => {
        if (
          el.repository === resource.name &&
          el.username.toString().toLowerCase() === resource.owner.toString().toLowerCase()
        ) {
          setProject(el.project);
        }
      });
    }
  }, [resources, resource]);

  useEffect(() => {
    if (project && Object.keys(project).length !== 0) {
      project
        .parseUsfm()
        .then((result) => {
          if (result.json && Object.keys(result.json.chapters).length > 0) {
            setChapter(result.json.chapters[reference.chapter]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setChapter(null);
    }
  }, [project, reference.chapter]);

  useEffect(() => {
    if (Chapter && verseRef.current[reference.verse]) {
      verseRef.current[reference.verse].scrollIntoView({
        block: 'center',
      });
    }
  }, [reference.verse]);

  useEffect(() => {
    let _verses = [];
    for (let key in chapter) {
      if (parseInt(key).toString() !== key.toString()) {
        continue;
      }
      const { verseObjects } = chapter[key];
      const verseStyle = {
        fontSize: fontSize + '%',
        cursor: 'context-menu',
        fontWeight: key === reference.verse ? 'bold' : 'inherit',
      };
      const verse = (
        <div
          ref={(ref) => (verseRef.current[key] = ref)}
          style={verseStyle}
          className={'verse' + (key === reference.verse ? ' current' : '')}
          key={key}
          onContextMenu={(e) => {
            setReferenceBlock({
              ...reference,
              resource: type,
              verse: key,
              text: getVerseText(verseObjects),
            });
            handleContextOpen(e);
          }}
          onClick={() =>
            reference.verse !== key
              ? goToBookChapterVerse(reference.bookId, reference.chapter, key)
              : false
          }
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
        </div>
      );
      _verses.push(verse);
    }
    setVerses(_verses);
  }, [chapter, reference, type, setReferenceBlock, goToBookChapterVerse, fontSize]);
  useEffect(() => {
    if (verseRef.current[reference.verse]) {
      const { top, left } = verseRef.current[reference.verse].getBoundingClientRect();
      setIntroContextMenuPosition({ top: top, left: left });
    }
    return () => {
      setIntroContextMenuPosition(false);
    };
  }, [introContextMenuOpen, reference.verse]);

  const anchorPosition =
    position.mouseY !== null && position.mouseX !== null
      ? { top: position.mouseY, left: position.mouseX }
      : undefined;

  const handleToClipboard = () => {
    navigator.clipboard
      .writeText(
        `${referenceBlock.text} (${t(referenceBlock.bookId)} ${referenceBlock.chapter}:${
          referenceBlock.verse
        })`
      )
      .then(
        () => {
          handleContextClose();
          enqueueSnackbar(t('copied_success'), { variant: 'success' });
        },
        (err) => {
          handleContextClose();
          enqueueSnackbar(t('copied_error'), { variant: 'error' });
        }
      );
  };

  return (
    <Card
      closeable
      onClose={() => onClose(type)}
      title={title}
      type={type}
      classes={{ ...classes, root: classes.root + ' intro-card' }}
    >
      <Menu
        keepMounted
        open={position.mouseY !== null || introContextMenuOpen}
        onClose={handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={!introContextMenuOpen ? anchorPosition : introContextMenuPosition}
        PopoverClasses={{ paper: 'intro-contextMenu' }}
      >
        {/*TODO сделать нормальное добавление класса */}
        <MenuItem onClick={handleOpenError}>{t('Error_report')}</MenuItem>
        <MenuItem onClick={handleToClipboard}>{t('Copy_to_clipboard')}</MenuItem>
      </Menu>
      {chapter ? verses : t('No_content')}
    </Card>
  );
}
