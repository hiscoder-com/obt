import React, { useEffect, useState, useContext, useCallback } from 'react';

import { Verse } from '@texttree/scripture-resources-rcl';
import { Box, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AppContext, ReferenceContext } from '../../context';
import { ContextMenu } from '../../components';
import { useScrollToVerse } from '../../hooks';

import { getVerseText } from '../../helper';

import { useCircularStyles, useNoContentStyles } from './style';

const initialPosition = {
  left: null,
  top: null,
};

function USFMContent({ reference, content, type, fontSize }) {
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

  const {
    actions: { setReferenceBlock, goToBookChapterVerse },
    state: { chunks, referenceSelected },
  } = useContext(ReferenceContext);
  const [selectedVerses, setSelectedVerses] = useState([referenceSelected.verse]);
  const {
    state: { switchChunks, switchWordPopover, selectVerses },
  } = useContext(AppContext);
  useEffect(() => {
    if (!selectVerses) {
      setSelectedVerses([referenceSelected.verse]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectVerses, referenceSelected.verse]);
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
  const toggle = useCallback(
    (key) => {
      if (!selectVerses) {
        if (key.toString() === reference.verse.toString()) {
          return 'primary.select';
        } else {
          return '';
        }
      } else {
        if (selectedVerses.includes(key)) {
          return 'primary.select';
        }
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedVerses]
  );

  useEffect(() => {
    const handleContextMenu = (e, key) => {
      e.preventDefault();
      selectedVerses.sort(function (a, b) {
        return a - b;
      });

      setReferenceBlock(
        selectedVerses.map((el) => {
          const { verseObjects } = chapter[el];
          return {
            ...reference,
            resource: type,
            verse: el,
            text: getVerseText(verseObjects),
          };
        })
      );

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
        if (!selectVerses) {
          if (reference.verse !== key) {
            goToBookChapterVerse(reference.bookId, reference.chapter, key);
          }
          return;
        }
        setSelectedVerses((prev) => {
          if (!prev.includes(key)) {
            return [...prev, key];
          } else {
            return prev.filter((el) => el !== key);
          }
        });
      };

      const verse = (
        <Box
          ref={(ref) => {
            key.toString() === reference.verse.toString() && verseRef(ref);
          }}
          style={verseStyle}
          className={'verse'}
          bgcolor={toggle(key)}
          key={key}
          onContextMenu={(e) => handleContextMenu(e, key, verseObjects)}
          onClick={handleClick}
        >
          {switchChunks && chunks.includes(key.toString()) && <p />}
          <Verse
            verseKey={key}
            verseObjects={verseObjects}
            paragraphs={false}
            showUnsupported={false}
            disableWordPopover={switchWordPopover}
            reference={{ ...reference, verse: key }}
            renderOffscreen={false}
          />
        </Box>
      );

      _verses.push(verse);
    }
    setVerses(_verses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chapter,
    reference,
    type,
    fontSize,
    switchChunks,
    chunks,
    switchWordPopover,
    selectedVerses,
    selectVerses,
  ]);

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
