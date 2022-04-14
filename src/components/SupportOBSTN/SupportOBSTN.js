import React, { useEffect, useState } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';

import { ButtonGroupUI, FrontModal } from '../../components';

export default function SupportOBSTN({
  title,
  classes,
  onClose,
  type,
  server,
  fontSize,
  reference: { bookId, chapter, verse },
  resource,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [configFront, setConfigFront] = useState({});
  const { t } = useTranslation();
  const [repoType, setRepoType] = useState('md');

  const mdContent = {
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-tn',
    filePath:
      String(chapter).padStart(2, '0') + '/' + String(verse).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'door43-catalog',
    server,
    httpConfig: { noCache: true },
  };

  const tsvContent = {
    verse: String(verse),
    chapter: String(chapter),
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
    httpConfig: { noCache: true },
  };

  const config = repoType === 'tsv' ? { ...tsvContent } : { ...mdContent };

  const {
    markdown,
    items,
    resource: { ...resourceData },
    resourceStatus: { loading },
    props: { languageId },
  } = useContent(config);
  useEffect(() => {
    if (resourceData?.project?.path) {
      const path = resourceData.project.path;
      if (path.substring(path.length - 3) === 'tsv') {
        setRepoType('tsv');
      } else {
        setRepoType('md');
      }
    }
  }, [resourceData?.project?.path]);
  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });

  const titleClick = () => {
    if (repoType === 'tsv') {
      setConfigFront({
        ...config,
        verse: '0',
      });
    } else {
      setConfigFront({
        ...config,
        filePath: String(chapter).padStart(2, '0') + '/00.md',
      });
    }
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter, verse]);

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(true)}
      classes={{ ...classes, children: 'tqcard' }}
      id={type}
      items={items}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
      showSaveChangesPrompt={() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }}
    >
      <ButtonGroupUI
        buttonGroupProps={{ size: 'small', color: 'primary' }}
        style={{ marginTop: '10px' }}
        buttons={[{ title: t('Story_title'), onClick: titleClick }]}
      />

      {configFront.projectId && (
        <FrontModal
          onCloseDialog={onCloseDialog}
          open={openDialog}
          config={configFront}
          field={'Note'}
          title={t('Story_title')}
          isTSV={repoType === 'tsv'}
        />
      )}
      <CardContent
        item={item}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdownView={markdownView}
      />
    </Card>
  );
}
