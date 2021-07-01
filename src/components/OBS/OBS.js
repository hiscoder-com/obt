import React, { useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { server } from '../../config/base';

export default function OBS(props) {
  const { title, classes, onClose, type } = props;
  const {
    state: { referenceSelected, fontSize, resourcesApp },
  } = useContext(AppContext);

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  const {
    markdown,
    items,
    isLoading,
    props: { languageId },
  } = useContent({
    projectId: referenceSelected.bookId,
    branch: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: resource.resourceId ?? 'obs',
    filePath: String(referenceSelected.chapter).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'bsa',
    server,
  });
  let _markdown;
  if (markdown) {
    _markdown = markdown.split('\n\n');
    _markdown.pop();
    _markdown.shift();
    for (let n = 0; n < _markdown.length / 2; n++) {
      const img = _markdown[n * 2];
      const text = _markdown[n * 2 + 1];
      let url_image = img.match(/\(([^)]*)\)/gm);
      url_image = url_image[0].slice(1, -1);
      console.log(url_image, '\n', text);
    }
    // console.log(_markdown);
  }

  const {
    state: { item, headers, itemIndex },
    actions: { setItemIndex },
  } = useCardState({
    items,
  });

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={classes}
      items={items}
      fontSize={fontSize}
      headers={headers}
      itemIndex={itemIndex}
      setItemIndex={setItemIndex}
    >
      <CardContent
        item={item}
        fontSize={fontSize}
        markdown={markdown}
        isLoading={isLoading}
        languageId={languageId}
      />
    </Card>
  );
}
