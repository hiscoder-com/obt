import React, { useState, useMemo, useEffect } from 'react';
import { Card } from 'translation-helps-rcl';
import { Verse, ResourcesContext } from 'scripture-resources-rcl';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../App.context';

import { resourcesList } from '../../config';

export default function Chapter({ title, classes, onClose, type, reference }) {
  const { t } = useTranslation();
  const { state } = React.useContext(ResourcesContext);
  const { actions } = React.useContext(AppContext);
  const { setType, setQuote } = actions;

  let project = useMemo(() => {}, []);

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
            setQuote(verseObjects[0].text);

            setType(type);
          }}
        >
          <Verse
            verseKey={key}
            verseObjects={verseObjects}
            paragraphs={false}
            showUnsupported={false}
            disableWordPopover={true}
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
      {chapter ? verses : t('Loading')}
    </Card>
  );
}
