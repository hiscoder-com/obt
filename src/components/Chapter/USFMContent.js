import React, { useEffect, useState, useContext } from 'react';

import { Verse } from 'scripture-resources-rcl';
import { useTranslation } from 'react-i18next';
import { getVerseText } from '../../helper';
import { ReferenceContext } from '../../context';
import { useScrollToVerse } from '../../hooks/useScrollToVerse';
import { CircularProgress } from '@material-ui/core';
import { useCircularStyles, useNoContentStyles } from './style';

function USFMContent({ reference, setPosition, content, type }) {
  const { t } = useTranslation();
  const [verses, setVerses] = useState();
  const [chapter, setChapter] = useState();
  const [verseRef] = useScrollToVerse('center');
  const classesCircular = useCircularStyles();
  const classesNoContent = useNoContentStyles();
  const resource = content.resource;
  const resourceLink = resource?.resourceLink;
  const { contentNotFoundError, error, loading } = content.resourceStatus;

  const {
    actions: { setReferenceBlock, goToBookChapterVerse },
  } = useContext(ReferenceContext);

  useEffect(() => {
    let isMounted = true;
    if (resource?.project && Object.keys(resource.project).length !== 0) {
      resource.project
        .parseUsfm()
        .then((result) => {
          // console.log({ result: result });
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

  return <>{usfmContent}</>;
}

export default USFMContent;
