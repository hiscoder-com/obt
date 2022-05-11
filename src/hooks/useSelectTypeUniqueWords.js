import { useState } from 'react';

import useDeepCompareEffect from 'use-deep-compare-effect';

export const useSelectTypeUniqueWords = (
  items,
  switchTypeUniqueWords,
  listWordsReference,
  chapter,
  verse,
  listWordsChapter
) => {
  const [uniqueWordsItems, setUniqueWordsItems] = useState([]);

  useDeepCompareEffect(() => {
    if (!items || items.length === 0) {
      return;
    }

    if (switchTypeUniqueWords === 'disabled') {
      setUniqueWordsItems(items);
      return;
    }

    const wordsItems = [];
    const checkItemsVerse = [];
    items.forEach((item) => {
      if (!checkItemsVerse.includes(item.TWLink)) {
        wordsItems.push(item);
        checkItemsVerse.push(item.TWLink);
      }
    });
    if (switchTypeUniqueWords === 'verse') {
      setUniqueWordsItems(wordsItems);
      return;
    }
    const otherWordsItems = [];
    wordsItems.forEach((item) => {
      if (
        (switchTypeUniqueWords === 'chapter' &&
          listWordsChapter &&
          item?.TWLink &&
          listWordsChapter[chapter] &&
          listWordsChapter[chapter][item?.TWLink] === verse) ||
        (switchTypeUniqueWords === 'book' &&
          listWordsReference &&
          item?.TWLink &&
          listWordsReference[item?.TWLink] &&
          listWordsReference[item?.TWLink][0] === chapter + ':' + verse)
      ) {
        otherWordsItems.push(item);
      }
    });
    setUniqueWordsItems(otherWordsItems);
  }, [switchTypeUniqueWords, { items }, listWordsReference]);

  return { uniqueWordsItems };
};
