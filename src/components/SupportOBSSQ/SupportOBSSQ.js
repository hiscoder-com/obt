import React, { useEffect } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';
import { ReferenceUtils } from 'bible-reference-rcl';
import { useTranslation } from 'react-i18next';

import { ButtonGroupUI, FrontModal } from '../../components';

import { langNames } from '../../config/materials';

export default function SupportOBSSQ({
  title,
  classes,
  onClose,
  type,
  server,
  fontSize,
  reference: { bookId, chapter, verse },
  resource,
}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [configFront, setConfigFront] = React.useState({});
  const { t } = useTranslation();

  const config = {
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'en',
    resourceId: 'obs-sq',
    verse,
    chapter,
    owner: resource.owner ?? 'unfoldingword',
    server,
  };

  const {
    items,
    resourceStatus,
    props: { languageId },
  } = useContent(config);

  const {
    state: { item, headers, filters, itemIndex },
    actions: { setFilters, setItemIndex },
  } = useCardState({
    items,
  });
  const onSummaryClick = () => {
    const lastVerse = ReferenceUtils.getVerseList('obs', chapter).pop().key;
    setConfigFront({ ...config, verse: '1-' + lastVerse, chapter });
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
      title={title + ' (' + langNames[resource.languageId].eng + ')'}
      onClose={() => onClose(type)}
      classes={{ ...classes, children: 'tqcard' }}
      id={type}
      items={items}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      showSaveChangesPrompt={() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }}
    >
      {items && (
        <ButtonGroupUI
          style={{ marginTop: '5px' }}
          buttons={[{ title: t('Summary'), onClick: onSummaryClick }]}
        />
      )}

      {configFront.projectId && (
        <FrontModal
          onCloseDialog={onCloseDialog}
          open={openDialog}
          config={configFront}
          field={'Response'}
          title={t('Summary')}
        />
      )}

      <CardContent
        item={item}
        filters={filters}
        fontSize={fontSize}
        viewMode="question"
        isLoading={Boolean(resourceStatus.loading)}
        languageId={languageId}
      />
    </Card>
  );
}
