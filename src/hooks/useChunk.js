import { useEffect, useState } from 'react';

import axios from 'axios';

export default function useChunk(chapter, bookId) {
  const [bookChunks, setBookChunks] = useState();
  const [chunks, setChunks] = useState();

  useEffect(() => {
    if (bookId && bookId !== 'obs') {
      axios
        .get(`https://api.unfoldingword.org/bible/txt/1/${bookId}/chunks.json`)
        .then((res) => setBookChunks(res.data))
        .catch((err) => console.log(err));
    }
  }, [bookId]);

  useEffect(() => {
    if (chapter && bookChunks) {
      setChunks(
        bookChunks
          .filter((el) => parseInt(el.chp).toString() === chapter.toString())
          .map((el) => parseInt(el.firstvs).toString())
          .filter((el) => el !== '1')
      );
    }
  }, [bookChunks, chapter]);

  return { chunks };
}
