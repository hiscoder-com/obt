import { useEffect, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';

import { ReferenceContext } from '../../context';

export default function Swipes() {
  const {
    actions: { goToNextChapter, goToPrevChapter },
  } = useContext(ReferenceContext);

  const { ref } = useSwipeable({
    onSwipedLeft: (eventData) => goToNextChapter(),
    onSwipedRight: (eventData) => goToPrevChapter(),
    delta: 100, // min distance(px) before a swipe starts. *See Notes*
  });

  useEffect(() => {
    ref(document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return Swipes;
}
