import { useEffect, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';

import { ReferenceContext } from '../../context';

export default function Swipes() {
const {
  actions: {
    goToNextChapter,
    goToPrevChapter,
  },
} = useContext(ReferenceContext);

  const { ref } = useSwipeable({
    onSwipedLeft: (eventData) => goToNextChapter(),
    onSwipedRight: (eventData) => goToPrevChapter(),
  });

  useEffect(() => {
    ref(document);
  }, []);

  return Swipes;
}
