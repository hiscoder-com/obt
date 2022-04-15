import { useEffect, useState } from 'react';

function useListWordsBook(tsvs, bookId) {
  const [listWords, setListWords] = useState();
  useEffect(() => {
    const list = {};
    if (tsvs) {
      Object.entries(tsvs).forEach(([key, chapters]) => {
        Object.entries(chapters).forEach(([key, verses]) => {
          verses.forEach((verse) => {
            if (Object.keys(list).includes(verse.TWLink)) {
              if (list[verse.TWLink].includes(verse.Reference)) {
                return;
              } else {
                list[verse.TWLink] = [...list[verse.TWLink], verse.Reference];
              }
            } else {
              list[verse.TWLink] = [verse.Reference];
            }
          });
        });
      });
    }
    setListWords(list);
    console.log(list);
  }, [bookId, tsvs]);

  return { listWords };
}

export default useListWordsBook;
