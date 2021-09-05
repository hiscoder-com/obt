import { useState, useEffect } from 'react';

export const useSwitchModeBible = (goToBookChapterVerse, reference, bookId) => {
  const _workspaceType = bookId === 'obs' ? 'obs' : 'bible';
  const [workspaceType, setWorkspaceType] = useState(_workspaceType);

  const openBible = () => {
    const curRef = JSON.parse(localStorage.getItem(reference))['bible'];
    goToBookChapterVerse(curRef.bookId, curRef.chapter, curRef.verse);
  };

  const openOBS = () => {
    const curRef = JSON.parse(localStorage.getItem(reference))['obs'];
    goToBookChapterVerse(curRef.bookId, curRef.chapter, curRef.verse);
  };

  // useEffect(() => {
  //   let cleanup = false;
  //   switch (workspaceType) {
  //     case 'obs':
  //       if (!cleanup) openOBS();
  //       break;
  //     case 'bible':
  //       if (!cleanup) openBible();
  //       break;
  //     default:
  //       break;
  //   }
  //   return () => {
  //     cleanup = true;
  //   };
  // }, [workspaceType]);

  return {
    state: {
      workspaceType,
    },
    actions: {
      setWorkspaceType,
      openBible,
      openOBS,
    },
  };
};
