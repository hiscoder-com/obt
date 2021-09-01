import { useEffect, useState, useCallback } from 'react';

/**
 *
 * @param {string} position 'top', 'center'
 * @returns
 */
export const useScrollToVerse = (position = 'start') => {
  const [currentVerse, setCurrentVerse] = useState(null);

  const verseRef = useCallback((node) => {
    if (node !== null) {
      setCurrentVerse(node);
    }
  }, []);

  useEffect(() => {
    if (currentVerse !== null) {
      currentVerse.scrollIntoView({ behavior: 'smooth', block: position });
    }
  }, [currentVerse, position]);

  return [verseRef];
};
