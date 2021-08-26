import { useEffect } from "react";

export const useScrollTo = (currentVerse) => {
  
  useEffect(() => {
    if (currentVerse !== null) {
      currentVerse.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      console.log(currentVerse)
    }
  }, [currentVerse]);

}