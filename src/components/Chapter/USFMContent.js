import React, { useEffect, useState, useContext } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Verse } from 'scripture-resources-rcl';
import { getVerseText } from '../../helper';
import { ReferenceContext } from '../../context';
import { useTranslation } from 'react-i18next';
import { useScrollToVerse } from '../../hooks/useScrollToVerse';
import { useCircularStyles } from './style';

function USFMContent({ reference, setPosition, content, type }) {
  const { t } = useTranslation();
  const [verses, setVerses] = useState();
  const [chapter, setChapter] = useState();
  const [old, setOld] = useState(null);
  const [verseRef] = useScrollToVerse('center');
  const classesCircular = useCircularStyles();
  /**
   * попробовать сохранить состояние, чтобы по сто раз не загружать контент с гита
   * так же использовать статус, идет загрузка, или получили ошибку
   * Если вдруг тут не получится использовать, то может быть попробовать глобально использовать хук useRsrc из scripture-resources-rcl
   */
  const {
    actions: { setReferenceBlock, goToBookChapterVerse },
  } = useContext(ReferenceContext);
  /** resourceStatus: contentNotFoundError, error, initialized, manifestNotFoundError */
  const isLoading = content.resourceStatus.loading;

  const resource = content.resource;
  console.info('PARSE CONTENT ' + type);
  const resourceLink = resource?.resourceLink;
  useEffect(() => {
    console.info('old', old, 'new', [resource, reference.chapter]);
    setOld([resource, reference.chapter]);
    console.info('USE EFFECT ' + type);
    let isMounted = true;
    if (resource?.project && Object.keys(resource.project).length !== 0) {
      console.info('PARSE USFM ' + type);
      resource.project
        .parseUsfm()
        .then((result) => {
          console.info('THEN ' + type);
          //console.log({ result: result });
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
      setPosition({
        mouseX: e.clientX - 2,
        mouseY: e.clientY - 4,
      });
    };

    let _verses = [];
    for (let key in chapter) {
      if (parseInt(key).toString() !== key.toString()) {
        continue;
      }
      const { verseObjects } = chapter[key];
      const handleClick = () =>
        reference.verse !== key
          ? goToBookChapterVerse(reference.bookId, reference.chapter, key)
          : false;

      const verse = (
        <div
          ref={(ref) => {
            key === reference.verse && verseRef(ref);
          }}
          className={'verse' + (key === reference.verse ? ' current' : '')}
          key={key}
          onContextMenu={(e) => handleContextMenu(e, key, verseObjects)}
          onClick={handleClick}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, reference, type]);

  return <>{isLoading || chapter === undefined ? (
        <div className={classesCircular.root}>
          <CircularProgress color="primary" size={100} />
        </div>
      ) : chapter != null ? (
        verses
      ) : (
        t('No_content')
      )}</>;
}

export default USFMContent;
