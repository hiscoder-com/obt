import { useEffect, useState } from 'react';

import useDeepCompareEffect from 'use-deep-compare-effect';

function useListWordsBook(tsvs, bookId) {
  const [listWordsBook, setListWordsBook] = useState();
  const [newTsvs, setNewTsvs] = useState({});
  const [listWordsChapter, setListWordChapter] = useState();

  useEffect(() => {
    if (tsvs) {
      setNewTsvs(tsvs);
    }
  }, [tsvs]);

  useDeepCompareEffect(() => {
    const listBook = {};

    if (newTsvs) {
      const listChapter = {};
      Object.entries(newTsvs).forEach(([key, chapters]) => {
        const chaptersWords = {};
        Object.entries(chapters).forEach(([key, verses]) => {
          verses.forEach((verse) => {
            if (Object.keys(listBook).includes(verse.TWLink)) {
              if (listBook[verse.TWLink].includes(verse.Reference)) {
                return;
              } else {
                listBook[verse.TWLink] = [...listBook[verse.TWLink], verse.Reference];
              }
            } else {
              listBook[verse.TWLink] = [verse.Reference];
            }
            if (Object.keys(chaptersWords).includes(verse.TWLink)) {
              if (chaptersWords[verse.TWLink].includes(verse.Reference)) {
                return;
              } else {
                chaptersWords[verse.TWLink] = [
                  ...chaptersWords[verse.TWLink],
                  verse.Reference,
                ];
              }
            } else {
              chaptersWords[verse.TWLink] = [verse.Reference];
            }
            // console.log(chaptersWords);
          });
        });
        listChapter[key] = chaptersWords;
      });
      setListWordChapter(listChapter);
    }

    setListWordsBook(listBook);
    // console.log(listBook);
  }, [bookId, newTsvs]);

  return { listWordsBook, listWordsChapter };
}

export default useListWordsBook;
