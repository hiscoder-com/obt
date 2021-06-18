export const getResources = (appConfig, resourcesApp) => {
  const resources = [];
  if (appConfig.length > 0) {
    appConfig.forEach((el) => {
      if (
        resourcesApp[el.i]?.subject &&
        [('Bible', 'Aligned Bible')].includes(resourcesApp[el.i]?.subject)
      ) {
        resources.push(resourcesApp[el.i].link);
      }
    });
  }
  resources.length === 0 && resources.push('Door43-catalog/ru_rob/master');
  return resources;
};

export const getUniqueResources = (appConfig, resourcesApp) => {
  if (appConfig.length === 0) {
    return resourcesApp;
  }
  const opened = appConfig.map((el) => el.i);
  return resourcesApp.filter((el) => !opened.includes(el.name));
};

// +
const getText = (verseObject) => {
  return verseObject.text || verseObject.nextChar || '';
};

// +
const getFootnote = (verseObject) => {
  return '/fn ' + verseObject.content + ' fn/';
};

// +
const getMilestone = (verseObject, showUnsupported) => {
  const { tag, children } = verseObject;

  switch (tag) {
    case 'k':
      return children.map((child) => getObject(child, showUnsupported)).join(' ');
    case 'zaln':
      if (children.length === 1 && children[0].type === 'milestone') {
        return getObject(children[0], showUnsupported);
      } else {
        return getAlignedWords(children);
      }
    default:
      return '';
  }
};

// +
const getAlignedWords = (verseObjects) => {
  return verseObjects
    .map((verseObject) => {
      return getWord(verseObject);
    })
    .join('');
};

// +
const getSection = (verseObject) => {
  return verseObject.content;
};

// +
const getUnsupported = (verseObject) => {
  return (
    '/' +
    verseObject.tag +
    ' ' +
    (verseObject.content || verseObject.text) +
    ' ' +
    verseObject.tag +
    '/'
  );
};

// +
const getWord = (verseObject) => {
  return verseObject.text || verseObject.content;
};

export const getVerseText = (verseObjects, showUnsupported = false) => {
  return verseObjects
    .map((verseObject) => getObject(verseObject, showUnsupported))
    .join('');
};

const getObject = (verseObject, showUnsupported) => {
  const { type } = verseObject;

  switch (type) {
    case 'quote':
    case 'text':
      return getText(verseObject);
    case 'milestone':
      return getMilestone(verseObject, showUnsupported);
    case 'word':
      if (verseObject.strong) {
        return getAlignedWords([verseObject]);
      } else {
        return getWord(verseObject);
      }
    case 'section':
      return getSection(verseObject);
    case 'paragraph':
      return '\n';
    case 'footnote':
      return getFootnote(verseObject);
    default:
      if (showUnsupported) {
        return getUnsupported(verseObject);
      } else {
        return '';
      }
  }
};
