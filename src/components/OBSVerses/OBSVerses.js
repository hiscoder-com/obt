import React, { useContext, useState, useEffect, useRef } from 'react';

import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context/AppContext';
import { ReferenceContext } from '../../context/ReferenceContext';
import { server } from '../../config/base';
import { CircularProgress } from '@material-ui/core';
import { useCircularStyles } from './style';

export default function OBSVerses(props) {
  const { t } = useTranslation();
  const classesCircular = useCircularStyles();
  const { title, classes, onClose, type } = props;
  const [verses, setVerses] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
  const obsRef = useRef([]);
  const { markdown, items, resourceStatus } = useContent({
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: resource.resourceId ?? 'obs',
    filePath: String(chapter).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'bsa',
    server,
  });

  useEffect(() => {
    if (obsRef.current[verse]) {
      obsRef.current[verse].scrollIntoView();
    }
  }, [verse]);

  useEffect(() => {
    setIsLoading(!(resourceStatus.initialized && !resourceStatus.loading));
  }, [resourceStatus])

  useEffect(() => {
    if (markdown) {
      setIsLoading(true);
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
      const contentMd = versesObject.map((item) => {
        const { key, urlImage, text } = item;
        const verseStyle = {
          fontSize: fontSize + '%',
          fontWeight: key === verse ? 'bold' : 'inherit',
        };
        return (
          <div
            ref={(ref) => (obsRef.current[key] = ref)}
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
        <div>
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
  }, [markdown, bookId, chapter, verse, t, fontSize, onChangeVerse]);

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
        <div>{isLoading ? <div className={classesCircular.root}>
          <CircularProgress color="primary" size={100} />
        </div> : verses}</div>
      </Card>
    </>
  );
}
