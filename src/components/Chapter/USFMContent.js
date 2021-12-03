import React, { useEffect, useState, useContext } from 'react';

import { Verse } from 'scripture-resources-rcl';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { getVerseText } from '../../helper';
import { ReferenceContext } from '../../context';
import { useScrollToVerse } from '../../hooks/useScrollToVerse';
import { CircularProgress } from '@material-ui/core';
import { useCircularStyles, useNoContentStyles } from './style';
import { ContextMenu } from '../../components';

const initialPosition = {
  left: null,
  top: null,
};

function USFMContent({ reference, content, type, fontSize, languageId }) {
  const { t } = useTranslation();
  const [verses, setVerses] = useState();
  const [chapter, setChapter] = useState();
  const [positionContextMenu, setPositionContextMenu] = useState(initialPosition);
  const [verseRef] = useScrollToVerse('center');
  const classesCircular = useCircularStyles();
  const classesNoContent = useNoContentStyles();
  const resource = content.resource;
  const resourceLink = resource?.resourceLink;
  const { contentNotFoundError, error, loading } = content.resourceStatus;
  const [chunks, setChunks] = useState([]);

  const {
    actions: { setReferenceBlock, goToBookChapterVerse },
  } = useContext(ReferenceContext);

  useEffect(() => {
    if (languageId === 'ru' && reference) {
      axios
        .get(`https://api.unfoldingword.org/bible/txt/1/${reference.bookId}/chunks.json`)
        .then((res) =>
          setChunks(
            res.data
              .filter((el) => parseInt(el.chp).toString() === reference.chapter)
              .map((el) => parseInt(el.firstvs).toString())
              .filter((el) => el !== '1')
          )
        )
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  useEffect(() => {
    let isMounted = true;
    if (resource?.project && Object.keys(resource.project).length !== 0) {
      resource.project
        .parseUsfm()
        .then((result) => {
          if (isMounted) {
            if (Object.keys(result.json.chapters).length > 0) {
              setChapter(result.json.chapters[reference.chapter]);
            }
          }
        })
        .catch((error) => console.log(error));
    } else {
      setChapter(null);
    }
    return () => {
      // clean up
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceLink, reference.chapter]);

  useEffect(() => {
    const handleContextMenu = (e, key, verseObjects) => {
      e.preventDefault();
      setReferenceBlock({
        ...reference,
        resource: type,
        verse: key,
        text: getVerseText(verseObjects),
      });
      setPositionContextMenu({
        left: e.clientX - 2,
        top: e.clientY - 4,
      });
    };

    let _verses = [];
    for (let key in chapter) {
      if (parseInt(key).toString() !== key.toString()) {
        continue;
      }
      const { verseObjects } = chapter[key];

      const verseStyle = {
        fontSize: fontSize + '%',
      };
      const handleClick = () => {
        if (reference.verse !== key) {
          goToBookChapterVerse(reference.bookId, reference.chapter, key);
        }
      };

      const verse = (
        <div
          ref={(ref) => {
            key.toString() === reference.verse.toString() && verseRef(ref);
          }}
          style={verseStyle}
          className={
            'verse' + (key.toString() === reference.verse.toString() ? ' current' : '')
          }
          key={key}
          onContextMenu={(e) => handleContextMenu(e, key, verseObjects)}
          onClick={handleClick}
        >
          {chunks.includes(key.toString()) && <p />}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, reference, type, fontSize]);

  const loadingContent = (
    <div className={classesCircular.root}>
      <CircularProgress color="primary" size={100} />
    </div>
  );
  const noContent = <div className={classesNoContent.root}>{t('No_content')}</div>;

  const usfmContent = loading
    ? loadingContent
    : !contentNotFoundError || !error
    ? verses
    : noContent;

  return (
    <>
      {usfmContent}
      <ContextMenu position={positionContextMenu} setPosition={setPositionContextMenu} />
    </>
  );
}

export default USFMContent;
