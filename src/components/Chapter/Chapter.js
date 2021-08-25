import React, { useState, useEffect, useContext, useRef } from 'react';

import { Card } from 'translation-helps-rcl';
import { Verse, ResourcesContext } from 'scripture-resources-rcl';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { AppContext } from '../../context/AppContext';
import { ReferenceContext } from '../../context/ReferenceContext';
import { getVerseText } from '../../helper';

import { ContextMenu } from '../ContextMenu';

export default function Chapter({ title, classes, onClose, type, reference }) {
  const { t } = useTranslation();
  const verseRef = useRef([]);

  const { state } = React.useContext(ResourcesContext);
  const {
    state: { resourcesApp, fontSize },
    actions: { setPositionContextMenu },
  } = useContext(AppContext);

  const {
    actions: { goToBookChapterVerse, setReferenceBlock },
  } = useContext(ReferenceContext);

  const [chapter, setChapter] = useState();
  const [verses, setVerses] = useState();
  const [project, setProject] = useState({});
  const [resource, setResource] = useState(false);

  const handleContextOpen = (event) => {
    event.preventDefault();
    setPositionContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
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

  return (
    <Card
      closeable
      onClose={() => onClose(type)}
      title={title}
      type={type}
      classes={{ ...classes, root: classes.root + ' intro-card' }}
    >
      <ContextMenu />
      {chapter ? verses : t('No_content')}
    </Card>
  );
}
