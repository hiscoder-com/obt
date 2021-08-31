import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useScrollToVerse } from '../../hooks';

function OBSContent({ markdown, verse, fontSize, onChangeVerse }) {
  const { t } = useTranslation();
  const [verses, setVerses] = useState();

  const [verseRef] = useScrollToVerse();

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

  useEffect(() => {
    if (markdown) {
      const { versesObject, headerMd, linkMd } = mdToVerses(markdown);
      const contentMd = versesObject.map((item) => {
        const { key, urlImage, text } = item;
        const verseStyle = {
          fontSize: fontSize + '%',
          fontWeight: key === verse ? 'bold' : 'inherit',
        };
        return (
          <div
            ref={(ref) => {
              key === verse && verseRef(ref);
            }}
            key={key}
            onClick={() => {
              onChangeVerse(key);
            }}
          >
            {urlImage ? (
              <>
                <img src={urlImage} alt={`OBS verse #${key}`} />
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
  }, [markdown, verse, verseRef, t, fontSize, onChangeVerse]);

  return <div>{verses}</div>;
}

export default OBSContent;
