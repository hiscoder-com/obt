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
      const headerMd = _markdown[0].trim().slice(1);
      const linkMd = _markdown[_markdown.length - 1].trim().slice(1, -1);

      _markdown.pop();
      _markdown.shift();
      const verseObject = [];
      for (let n = 0; n < _markdown.length / 2; n++) {
        const imageOBS = _markdown[n * 2];
        const text = _markdown[n * 2 + 1];
        let url_image = imageOBS.match(/\(([^)]*)\)/gm);
        url_image = url_image[0].slice(1, -1);

        verseObject.push({ url_image, text });
      }

      return { verseObject, headerMd, linkMd };
    }
  }

  useEffect(() => {
    if (markdown) {
      const { verseObject, headerMd, linkMd } = mdToVerse(markdown);
      let content = [];
      for (let key = 0; key <= verseObject.length - 1; key++) {
        content.push(
          <div key={key}>
            <p></p>
            <img src={verseObject[key].url_image} alt={key} />
            <p></p>
            <div
              onClick={() =>
                setReferenceSelected({ ...referenceSelected, verse: key.toString() })
              }
              key={key}
            >
              {verseObject[key].text}
            </div>
          </div>
        );
      }
      let verseOBS = (
        <>
          <h1>{headerMd}</h1> {content}
          <p></p>
          <i>{linkMd}</i>
        </>
      );
      setVerses(verseOBS);
    }
  }, [setReferenceSelected, markdown, referenceSelected]);
  console.log(referenceSelected);

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
        <>{verses}</>
      </Card>
    </>
  );
}
