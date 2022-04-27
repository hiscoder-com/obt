import { useState } from 'react';

import useDeepCompareEffect from 'use-deep-compare-effect';

function useListWordsReference(tsvs, bookId) {
  const [listWordsReference, setListWordsReference] = useState({});
  const [listWordsChapter, setListWordChapter] = useState({});

  useDeepCompareEffect(() => {
    if (!tsvs) {
      return;
    }
    const listBook = {};

    const listChapter = {};
    Object.entries(tsvs).forEach(([key, chapters]) => {
      const chaptersWords = {};
      Object.entries(chapters).forEach(([key, verses]) => {
        verses.forEach((verse) => {
          if (!Object.keys(listBook).includes(verse.TWLink)) {
            listBook[verse.TWLink] = [verse.Reference];
          }

          if (!listBook[verse.TWLink].includes(verse.Reference)) {
            listBook[verse.TWLink].push(verse.Reference);
          }

          if (!Object.keys(chaptersWords).includes(verse.TWLink)) {
            chaptersWords[verse.TWLink] = verse.Reference.split(':')[1];
          }
        });
      });
      listChapter[key] = chaptersWords;
    });

    setListWordChapter(listChapter);
    setListWordsReference(listBook);
  }, [bookId, { tsvs }]);

  return { listWordsReference, listWordsChapter };
}

export default useListWordsReference;
