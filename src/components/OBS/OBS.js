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
  if (markdown) {
    // console.log(markdown);
    console.log(markdown.split('\n\n'));
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
