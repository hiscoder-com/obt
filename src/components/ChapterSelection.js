import React from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { ResourcesContext } from 'scripture-resources-rcl';

import { resourcesList } from '../config';

function ChapterSelection(props) {
  const { appConfig, setReferenceSelected } = props;
  const { state } = React.useContext(ResourcesContext);

  const resource = resourcesList[appConfig[0].i];

  const successCallback = (result) => {
    if (Object.keys(result.chapters).length > 0) {
      console.log(result);
    } else {
      console.log('Book not found');
    }
  };

  let project = {};
  if (state?.resources) {
    state.resources.forEach((el) => {
      if (el.resourceId === resource.resourceId && el.username === resource.owner) {
        project = el.project;
      }
    });
  }

  useDeepCompareEffect(() => {
    if (Object.keys(project).length !== 0) {
      project.parseUsfm().then(successCallback, (error) => console.log(error));
    }
  }, [project]);

  function changeСhapter() {
    console.log('yes??');
    setReferenceSelected({ bookId: 'tit', chapter: 2 });
    console.log(state);
  }

  return (
    <>
      <button onClick={() => changeСhapter()}>uhh</button>
    </>
  );
}

export default ChapterSelection;
