import { useEffect, useState, useCallback } from 'react';

export const useScrollTo = () => {
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
        block: 'center',
      });
      console.log(currentVerse);
    }
  }, [currentVerse]);

  return [verseRef];
};
