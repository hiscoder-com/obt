import React from 'react';
import {
  Card,
  CardContent,
  useContent,
  useCardState,
  useTsvMerger,
} from 'translation-helps-rcl';

export default function SupportOBSSQ(props) {
  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const { bookId, chapter, verse } = reference;
  const {
    tsvs,
    markdown,
    items,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent({
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-sq',
    filePath: null,
    owner: resource.owner ?? 'door43-catalog',
    server,
  });

  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });

  // const [content, setContent] = React.useState();
  // const { onTsvEdit } = useTsvMerger({
  //   tsvs,
  //   verse,
  //   chapter,
  //   itemIndex,
  //   setContent: setContent,
  // });
  // console.log(content);
  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={{ ...classes, children: 'tqcard' }}
      id={type}
      items={tsvs}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
    >
      <CardContent
        item={item}
        filters={filters}
        // onTsvEdit={onTsvEdit}
        fontSize={fontSize}
        markdown={markdown}
        viewMode="question"
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdownView={markdownView}
      />
    </Card>
  );
}
