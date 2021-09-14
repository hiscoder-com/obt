import { useEffect, useState, useCallback } from 'react';

export const useScrollToVerse = (position = 'start') => {
  const [currentVerse, setCurrentVerse] = useState(null);

  const verseRef = useCallback((node) => {
    if (node !== null) {
      setCurrentVerse(node);
    }
  }, []);

  useEffect(() => {
    if (currentVerse !== null) {
      currentVerse.scrollIntoView({
        block: position,
      });
    }
  }, [currentVerse, position]);

  return [verseRef];
};
