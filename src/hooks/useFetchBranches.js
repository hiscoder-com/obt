import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchBranches({ server, owner, languageId, resourceId }) {
  const [branches, setBranches] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${server}/api/v1/repos/${owner}/${languageId}_${resourceId}/branches?limit=100`
      )
      .then((result) => setBranches(result.data.map((el) => el.name)))
      .catch((error) => console.log(error));
  }, [server, owner, languageId, resourceId]);

  //git.door43.org/api/v1/repos/bsa/ru_tq/branches?limit=100
  return branches;
}
