import React, { useContext, useState, useEffect, useRef } from 'react';

import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';
import { server } from '../../config/base';

export default function OBSVerses(props) {
  const { t } = useTranslation();
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
  const obsRef = useRef(null);
  const { markdown, items } = useContent({
    projectId: referenceSelected.bookId,
    branch: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: resource.resourceId ?? 'obs',
    filePath: String(referenceSelected.chapter).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'bsa',
    server,
  });

  useEffect(() => {
    if (obsRef.current) {
      obsRef.current.scrollIntoView();
    }
  }, [referenceSelected.chapter]);

  useEffect(() => {
    if (markdown) {
      const mdToVerses = (md) => {
        let _markdown = md.split(/\n[\s]*/);
        const headerMd = _markdown.shift().trim().slice(1);
        let linkMd = _markdown.pop().trim().slice(1, -1);
        if (linkMd === '') {
          linkMd = _markdown.pop().trim().slice(1, -1);
        }
        const versesObject = [];

        for (let n = 0; n < _markdown.length / 2; n++) {
          let urlImage;
          let text;
          if (/\(([^)]*)\)/g.test(_markdown[n * 2])) {
            urlImage = /\(([^)]*)\)/g.exec(_markdown[n * 2])[1];
            text = _markdown[n * 2 + 1];
          } else {
            text = _markdown[n * 2] + '\n' + _markdown[n * 2 + 1];
          }
          versesObject.push({ urlImage, text, key: (n + 1).toString() });
        }

        return { versesObject, headerMd, linkMd };
      };
      const { versesObject, headerMd, linkMd } = mdToVerses(markdown);
      const contentMd = versesObject.map((verse) => {
        const { key, urlImage, text } = verse;
        const verseStyle = {
          fontSize: fontSize + '%',
          fontWeight: key === referenceSelected.verse ? 'bold' : 'inherit',
        };
        return (
          <div
            key={key}
            onClick={() => {
              setReferenceSelected({
                bookId: referenceSelected.bookId,
                chapter: referenceSelected.chapter,
                verse: key,
              });
            }}
          >
            {urlImage ? (
              <>
                <img
                  src={urlImage}
                  alt={`OBS verse #${key} OBS chapter#${referenceSelected.chapter}`}
                />
                <br />
              </>
            ) : (
              ''
            )}
            {text.split('\n').map((el, index) => (
              <p style={verseStyle} key={index}>
                {el}
              </p>
            ))}
          </div>
        );
      });
      const versesOBS = (
        <div ref={obsRef}>
          <h1>{headerMd}</h1>
          {contentMd}
          <br />
          <i>{linkMd}</i>
        </div>
      );
      setVerses(versesOBS);
    } else {
      setVerses(<>{t('No_content')}</>);
    }
  }, [
    setReferenceSelected,
    markdown,
    referenceSelected.bookId,
    referenceSelected.chapter,
    t,
    fontSize,
    referenceSelected.verse,
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
        <div>{verses}</div>
      </Card>
    </>
  );
}
