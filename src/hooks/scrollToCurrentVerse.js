import { useEffect, useState, useCallback } from 'react';

export const useScrollTo = (position = 'start') => {
  const [currentVerse, setCurrentVerse] = useState(null);

  const verseRef = useCallback((node) => {
    if (node !== null) {
      setCurrentVerse(node);
    }
  }, []);

  useEffect(() => {
    if (currentVerse !== null) {
      currentVerse.scrollIntoView({
        behavior: 'smooth',
        block: position,
      });
      console.log(currentVerse);
    }
  }, [currentVerse, position]);

  return [verseRef];
};
