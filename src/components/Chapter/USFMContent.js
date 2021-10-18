import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResourcesContext } from 'scripture-resources-rcl';

function USFMContent({ chapter, verses, setChapter, resource, reference }) {
  const { t } = useTranslation();
  const { state } = React.useContext(ResourcesContext);
  const [project, setProject] = useState({});

  const resources = state?.resources;
  useEffect(() => {
    if (resources) {
      resources.forEach((el) => {
        if (
          el.repository === resource.name &&
          el.username.toString().toLowerCase() === resource.owner.toString().toLowerCase()
        ) {
          setProject(el.project);
        }
      });
    }
  }, [resources, resource]);

  useEffect(() => {
    if (project && Object.keys(project).length !== 0) {
      project
        .parseUsfm()
        .then((result) => {
          if (result.json && Object.keys(result.json.chapters).length > 0) {
            setChapter(result.json.chapters[reference.chapter]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setChapter(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, reference.chapter]);

  return <div>{chapter ? verses : t('No_content')}</div>;
}

export default USFMContent;
