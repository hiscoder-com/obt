import React, { useContext, useState, useEffect, useRef } from 'react';

import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';
import { ReferenceContext } from '../../ReferenceContext';
import { server } from '../../config/base';

export default function OBSVerses(props) {
  const { t } = useTranslation();
  const { title, classes, onClose, type } = props;
  const [verses, setVerses] = useState();
  const {
    state: { fontSize, resourcesApp },
  } = useContext(AppContext);

  const {
    state: { referenceSelected },
    actions: { onChangeVerse },
  } = useContext(ReferenceContext);

  const { bookId, chapter, verse } = referenceSelected;

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });
  const obsRef = useRef(null);
  const { markdown, items } = useContent({
    projectId: bookId,
    branch: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: resource.resourceId ?? 'obs',
    filePath: String(chapter).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'bsa',
    server,
  });

  useEffect(() => {
    if (obsRef.current) {
      obsRef.current.scrollIntoView();
    }
  }, [chapter]);

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
          fontWeight: key === verse ? 'bold' : 'inherit',
        };
        return (
          <div
            key={key}
            onClick={() => {
              onChangeVerse(key);
            }}
          >
            {urlImage ? (
              <>
                <img src={urlImage} alt={`OBS verse #${key} OBS chapter#${chapter}`} />
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
  }, [markdown, bookId, chapter, t, fontSize, verse, onChangeVerse]);

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
