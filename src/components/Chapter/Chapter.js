import React, { useState, useEffect, useContext, useRef } from 'react';

import { Card } from 'translation-helps-rcl';
import { Verse } from 'scripture-resources-rcl';

import USFMContent from './USFMContent';
import VerseMenu from './VerseMenu';
import { AppContext, ReferenceContext } from '../../context';
import { getVerseText } from '../../helper';

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

export default function Chapter({ title, classes, onClose, type, reference }) {
  const verseRef = useRef([]);
  const [position, setPosition] = React.useState(initialPosition);
  const {
    state: { resourcesApp, fontSize },
  } = useContext(AppContext);

  const {
    actions: { goToBookChapterVerse, setReferenceBlock },
  } = useContext(ReferenceContext);

  const [chapter, setChapter] = useState();
  const [verses, setVerses] = useState();
  const [resource, setResource] = useState(false);

  const handleContextOpen = (event) => {
    event.preventDefault();
    setPosition({
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

  useEffect(() => {
    if (chapter && verseRef.current[reference.verse]) {
      verseRef.current[reference.verse].scrollIntoView({
        block: 'center',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            e.preventDefault();
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
      classes={classes}
    >
      <VerseMenu
        position={position}
        setPosition={setPosition}
        initialPosition={initialPosition}
      />
      <USFMContent
        chapter={chapter}
        setChapter={setChapter}
        resource={resource}
        verses={verses}
        reference={reference}
      />
    </Card>
  );
}
