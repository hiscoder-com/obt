import React, { useContext, useState, useEffect } from 'react';

import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { server } from '../../config/base';

export default function OBSVerse(props) {
  const { title, classes, onClose, type } = props;
  const [verses, setVerses] = useState();
  const {
    state: { referenceSelected, fontSize, resourcesApp },
    actions: { setReferenceSelected },
  } = useContext(AppContext);

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  const { markdown, items } = useContent({
    projectId: referenceSelected.bookId,
    branch: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: resource.resourceId ?? 'obs',
    filePath: String(referenceSelected.chapter).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'bsa',
    server,
  });

  function mdToVerse(md) {
    if (md) {
      let _markdown = md.split('\n\n');
      const headerMd = _markdown.shift().trim().slice(1, -1);
      const linkMd = _markdown.pop().trim().slice(1, -1);

      const verseObject = [];
      for (let n = 0; n < _markdown.length / 2; n++) {
        const urlImage = /\(([^)]*)\)/g.exec(_markdown[n * 2])[1];
        console.log();
        const text = _markdown[n * 2 + 1];
        verseObject.push({ urlImage, text, key: (n + 1).toString() });
      }
      return { verseObject, headerMd, linkMd };
    }
  }

  useEffect(() => {
    if (markdown) {
      const { verseObject, headerMd, linkMd } = mdToVerse(markdown);
      const contentMd = verseObject.map((verse) => {
        const { key, urlImage, text } = verse;
        return (
          <div
            key={key}
            onClick={() =>
              setReferenceSelected({
                bookId: referenceSelected.bookId,
                chapter: referenceSelected.chapter,
                verse: key,
              })
            }
          >
            <img
              src={urlImage}
              alt={`OBSVerse #${key} OBS chapter#${referenceSelected.chapter}`}
            />
            <br />
            <p>{text}</p>
          </div>
        );
      });
      const verseOBS = (
        <>
          <h1>{headerMd}</h1> {contentMd}
          <br />
          <i>{linkMd}</i>
        </>
      );
      setVerses(verseOBS);
    }
  }, [
    setReferenceSelected,
    markdown,
    referenceSelected.bookId,
    referenceSelected.chapter,
  ]);

  const {
    state: { headers, itemIndex },
    actions: { setItemIndex },
  } = useCardState({
    items,
  });

  return (
    <>
      <Card
        closeable
        title={title}
        onClose={() => onClose(type)}
        classes={{ ...classes, children: 'obs' }}
        items={items}
        fontSize={fontSize}
        headers={headers}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
      >
        <div style={{ fontSize: fontSize + '%' }}>{verses}</div>
      </Card>
    </>
  );
}
