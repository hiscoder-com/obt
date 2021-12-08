import { useState, useEffect } from 'react';

import { useProskomma, useImport, useSearchForPassages } from 'proskomma-react-hooks';
import axios from 'axios';

export default function useSearch({
  languageId,
  name,
  owner,
  bookId,
  chapter,
  searchText,
  usfm,
}) {
  const [bookData, setBookData] = useState({});
  const [tokens, setTokens] = useState([]);
  const searchT = 'благо';

  async function getBookText() {
    const response = await axios.get(
      `https://git.door43.org/${owner}/${name}/raw/branch/master/57-TIT.usfm`
    );
    return response.data;
  }

  useEffect(() => {
    getBookText().then((bookData) => {
      setBookData(bookData);
    });
  }, []);

  const docSetId = `${owner}/${name}`;
  const bookCode = bookId.toUpperCase();
  const verbose = true;
  const documents = [
    {
      selectors: {
        org: owner,
        lang: languageId,
        abbr: name.split('_')[1],
      },
      bookCode: bookId.toUpperCase(),
      data: bookData,
    },
  ];

  const {
    stateId,
    newStateId,
    proskomma,
    errors: proskommaErrors,
  } = useProskomma({
    verbose,
  });
  const { errors: importErrors } = useImport({
    proskomma,
    stateId,
    newStateId,
    documents,
    verbose,
  });

  const {
    stateId: searchStateId,
    query,
    passages,
    errors: searchErrors,
    data,
  } = useSearchForPassages({
    proskomma,
    stateId,
    text: searchT,
    docSetId,
    bookCode,
    // blocks: true,
    tokens: true,
  });

  useEffect(() => {
    setTokens(data?.docSet?.document?.cvMatching);
  }, [data]);

  return { passages, tokens, data };
}
