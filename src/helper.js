import { cloneDeep } from 'lodash';

import {
  defaultTplBible,
  defaultTplOBS,
  defaultBibleReference,
  defaultOBSReference,
} from './config/base';

export const getResources = (appConfig, resourcesApp) => {
  const resources = [];
  if (!appConfig?.lg || appConfig.lg.length > 0) {
    appConfig.lg.forEach((el) => {
      resourcesApp.forEach((r_el) => {
        if (
          r_el?.subject &&
          [
            'Bible',
            'Aligned Bible',
            'Hebrew Old Testament',
            'Greek New Testament',
          ].includes(r_el.subject) &&
          r_el.owner + '__' + r_el.name === el.i
        ) {
          resources.push(r_el.link);
        }
      });
    });
  }
  return resources;
};

export const getBookList = (bibleList, t) => {
  const result = [];
  bibleList.forEach((el) => {
    result.push({ key: el.identifier, name: t(el.identifier), label: t(el.identifier) });
  });
  return result;
};

export const getUniqueResources = (appConfig, resourcesApp) => {
  if (!appConfig?.lg || appConfig.lg.length === 0) {
    return resourcesApp;
  }
  const opened = appConfig.lg.map((el) => el.i);
  return resourcesApp.filter((el) => !opened.includes(el.owner + '__' + el.name));
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
    ?.map((verseObject) => getObject(verseObject, showUnsupported))
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

export const langArrToObject = (langs) => {
  let result = {};
  langs.forEach((el) => {
    result[el] = { translation: require(`./config/locales/${el}/translation.json`) };
  });
  return result;
};
/**
 *
 * @param {string} el Name
 * @param {*} val default value
 * @param {string} type is string or object or bool
 * @param {string} ext if value is object, check element
 * @returns
 */
export const checkLSVal = (el, val, type = 'string', ext = false) => {
  let value;
  switch (type) {
    case 'object':
      try {
        value = JSON.parse(localStorage.getItem(el));
      } catch (error) {
        localStorage.setItem(el, JSON.stringify(val));
        return val;
      }
      break;
    case 'boolean':
      if (localStorage.getItem(el) === null) {
        value = null;
      } else {
        value = localStorage.getItem(el) === 'true';
      }
      break;

    case 'string':
    default:
      value = localStorage.getItem(el);
      break;
  }

  if (value === null || (ext && !value[ext])) {
    localStorage.setItem(el, type === 'string' ? val : JSON.stringify(val));
    return val;
  } else {
    return value;
  }
};

export const animate = ({ timing, draw, duration = 1000 }) => {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};
const easeInOut = (timeFraction) => {
  if (timeFraction < 0.5) {
    return timeFraction * timeFraction * 2;
  } else {
    return 1 - (1 - timeFraction) * (1 - timeFraction) * 2;
  }
};

/*const linear = (timeFraction) => {
  return timeFraction;
};*/

export const animateScrollTo = (currentVerse, position) => {
  if (!currentVerse.clientHeight && !currentVerse.parentNode?.clientHeight) {
    return false;
  }
  const duration = 1000;
  const draw = (tf) => {
    let offset = 0;
    const top = currentVerse.offsetTop - 12;
    switch (position) {
      case 'center':
        offset = currentVerse.clientHeight / 2 - currentVerse.parentNode.clientHeight / 2;
        break;
      case 'top':
      default:
        break;
    }
    currentVerse.parentNode.scrollTop =
      currentVerse.parentNode.scrollTop * (1 - tf) + (top + offset) * tf;
  };
  animate({ timing: easeInOut, draw, duration });
};

export const scrollTo = (currentVerse, position) => {
  let offset = 0;
  const top = currentVerse.offsetTop - 12;
  switch (position) {
    case 'center':
      offset = currentVerse.clientHeight / 2 - currentVerse.parentNode.clientHeight / 2;
      break;
    case 'top':
    default:
      break;
  }
  currentVerse.parentNode.scrollTo(0, top + offset);
};

export const switchModeBible = (type, goToBookChapterVerse, setAppConfig) => {
  const curRef = JSON.parse(localStorage.getItem('reference'))[type];
  const appConfig = JSON.parse(localStorage.getItem('appConfig'))[type];
  setAppConfig(appConfig);
  goToBookChapterVerse(curRef.bookId, curRef.chapter, curRef.verse);
};

const resetMode = (
  defaultTpl,
  defaultReference,
  currentLanguage,
  setAppConfig,
  setLanguageResources,
  goToBookChapterVerse
) => {
  setAppConfig(defaultTpl[currentLanguage]);

  setLanguageResources((prev) => {
    const new_val = cloneDeep(prev);
    defaultTpl[currentLanguage].lg.forEach((el) => {
      if (
        !!el.i.split('__')[1]?.split('_')[0] &&
        !new_val.includes(el.i.split('__')[1]?.split('_')[0])
      ) {
        new_val.push(el.i.split('__')[1]?.split('_')[0]);
      }
    });
    return new_val;
  });

  goToBookChapterVerse(
    defaultReference[currentLanguage].bookId,
    defaultReference[currentLanguage].chapter,
    defaultReference[currentLanguage].verse
  );
};

/**
 * A function that resets the value of layouts, resources and reference
 *
 * @param {string} bookId - Current bookId
 * @param {function} setAppConfig - State function that changes appconfig
 * @param {function} goToBookChapterVerse - Function that changes reference
 * @param {string} currentLanguage - current language of app
 * @param {boolean} resetAll reset layouts,reference to default in bible and obs
 *
 */

export const resetWorkspace = ({
  bookId,
  setAppConfig,
  setLanguageResources,
  goToBookChapterVerse,
  currentLanguage,
  resetAll,
}) => {
  const workspaceType = resetAll ? 'all' : bookId === 'obs' ? 'obs' : 'bible';
  const oldAppConfig = JSON.parse(localStorage.getItem('appConfig'));
  switch (workspaceType) {
    case 'bible':
      const bibleAppConfig = {
        ...oldAppConfig,
        [workspaceType]: defaultTplBible[currentLanguage],
      };
      localStorage.setItem('appConfig', JSON.stringify(bibleAppConfig));
      resetMode(
        defaultTplBible,
        defaultBibleReference,
        currentLanguage,
        setAppConfig,
        setLanguageResources,
        goToBookChapterVerse
      );
      break;

    case 'obs':
      const obsAppConfig = {
        ...oldAppConfig,
        [workspaceType]: defaultTplOBS[currentLanguage],
      };
      localStorage.setItem('appConfig', JSON.stringify(obsAppConfig));
      resetMode(
        defaultTplOBS,
        defaultOBSReference,
        currentLanguage,
        setAppConfig,
        setLanguageResources,
        goToBookChapterVerse
      );
      break;
    case 'all':
      const allAppConfig = {
        obs: defaultTplOBS[currentLanguage],
        bible: defaultTplBible[currentLanguage],
      };
      localStorage.setItem('appConfig', JSON.stringify(allAppConfig));
      bookId === 'obs'
        ? resetMode(
            defaultTplOBS,
            defaultOBSReference,
            currentLanguage,
            setAppConfig,
            setLanguageResources,
            goToBookChapterVerse
          )
        : resetMode(
            defaultTplBible,
            defaultBibleReference,
            currentLanguage,
            setAppConfig,
            setLanguageResources,
            goToBookChapterVerse
          );
      break;
    default:
      break;
  }
};

export const getLayoutType = (layout) => {
  let type = 'bible';
  layout.forEach((el) => {
    if (el.i.split('__')[1]?.split('_')[1]?.split('-')[0] === 'obs') {
      type = 'obs';
    }
  });
  return type;
};

export const getLanguageIds = () => {
  let oldAppConfig = JSON.parse(localStorage.getItem('appConfig'));
  const allValues = [...Object.values(oldAppConfig)];
  let currentLangs = new Set();
  if (allValues) {
    allValues.forEach((value) => {
      value.lg.forEach((el) => {
        currentLangs.add(el.i.split('__')[1]?.split('_')[0]);
      });
    });
  }
  currentLangs.add(localStorage.getItem('i18nextLng'));
  return Array.from(currentLangs);
};
const equalNames = (langObj) => {
  const { lang, eng } = langObj;
  if (lang !== eng || eng === '') {
    return eng;
  } else {
    return null;
  }
};
export const packageLangs = (langObj) => {
  if (!langObj) return false;
  const eng = equalNames(langObj);
  if (eng) {
    return `${langObj.lang} (${eng})`;
  } else {
    return langObj.lang;
  }
};
export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
export const fixUrl = (content) => {
  if (!content) {
    return;
  }
  const links = content.match(/\[{2}\S+\]{2}/g);
  if (!links) {
    return content;
  }
  let contentWithUrl = content;

  links.forEach((el) => {
    const changeUrl = contentWithUrl
      .replace('[[', `[${el.replace(/\[{2}|\]{2}/g, '')}](`)
      .replace(']]', ')');
    contentWithUrl = changeUrl;
  });

  return contentWithUrl;
};
