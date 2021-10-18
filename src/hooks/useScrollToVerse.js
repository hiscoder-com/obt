import { useEffect, useState, useCallback } from 'react';


import { scrollTo } from '../helper';

/**
 *
 * @param {string} position 'top', 'center'
 * @returns
 */
export const useScrollToVerse = (position = 'top') => {
  const [currentVerse, setCurrentVerse] = useState(null);

  const verseRef = useCallback((node) => {
    if (node !== null) {
      setCurrentVerse(node);
    }
  }, []);

  useEffect(() => {
    if (currentVerse !== null) {
      scrollTo(currentVerse, position);
    }
  }, [currentVerse, position]);

  return [verseRef];
};
