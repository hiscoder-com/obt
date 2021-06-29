import React, { useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { resourcesList, server } from '../../config';

export default function OBS(props) {
  const { title, classes, onClose, type } = props;
  const appContext = useContext(AppContext);
  const { referenceSelected, fontSize } = appContext.state;

  const {
    markdown,
    items,
    isLoading,
    props: { languageId },
  } = useContent({
    projectId: referenceSelected.bookId,
    branch: resourcesList[type].branch ?? 'master',
    languageId: resourcesList[type].languageId ?? 'ru',
    resourceId: resourcesList[type].resourceId ?? 'obs',
    filePath: String(referenceSelected.chapter).padStart(2, '0') + '.md',
    owner: resourcesList[type].owner ?? 'bsa',
    server,
  });
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
