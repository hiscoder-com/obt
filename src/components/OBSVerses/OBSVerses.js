import React, { useContext } from 'react';

import { Card, useContent } from 'translation-helps-rcl';

import OBSContent from './OBSContent';

import { AppContext, ReferenceContext } from '../../context';
import { server } from '../../config/base';
import { CircularProgress } from '@material-ui/core';
import { useCircularStyles } from './style';


export default function OBSVerses({ title, classes, onClose, type }) {
  const classesCircular = useCircularStyles();
  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { fontSize, resourcesApp },
  } = useContext(AppContext);

  const {
    state: {
      referenceSelected: { bookId, chapter, verse },
    },
    actions: { onChangeVerse },
  } = useContext(ReferenceContext);

  let resource = false;

  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });
  const { markdown, resourceStatus } = useContent({
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: resource.resourceId ?? 'obs',
    filePath: String(chapter).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'bsa',
    server,
  });

  useEffect(() => {
    setIsLoading(!(resourceStatus.initialized && !resourceStatus.loading));
  }, [resourceStatus])

 
  return (
    <>
      <Card
        closeable
        title={title}
        onClose={() => onClose(type)}
        classes={{ ...classes, children: 'obs' }}
        fontSize={fontSize}
      >
       {
          isLoading ? <div className={classesCircular.root}>
          <CircularProgress color="primary" size={100} />
        </div> : 
        <OBSContent
          markdown={markdown}
          fontSize={fontSize}
          verse={verse}
          onChangeVerse={onChangeVerse}
          type={type}
        />
         }
      </Card>
    </>
  );
}
