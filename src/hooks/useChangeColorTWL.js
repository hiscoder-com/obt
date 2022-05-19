import { useEffect, useState } from 'react';

export const useChahgeColorTWL = (
  items,
  switchHideRepeatedWords,
  uniqueWordsItems,
  itemIndex
) => {
  const [changeColor, setChangeColor] = useState();

  useEffect(() => {
    const _changeColor =
      !switchHideRepeatedWords &&
      uniqueWordsItems &&
      items &&
      items.length > 0 &&
      (itemIndex !== undefined || null) &&
      !uniqueWordsItems.includes(items[itemIndex]);
    setChangeColor(_changeColor);
  }, [itemIndex, items, uniqueWordsItems, switchHideRepeatedWords]);

  return { changeColor };
};
