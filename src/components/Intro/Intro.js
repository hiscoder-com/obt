import React from 'react';

import { Steps } from 'intro.js-react';

import 'intro.js/introjs.css';

// https://github.com/HiDeoo/intro.js-react обертка для реакта
// https://introjs.com/docs/examples/events/confirm-before-exit сама библиотека

function Intro() {
  const onBeforeChange = (nextStepIndex) => {
    // вот эта функция обязательна.
    // К примеру 1 шаг показать аппбар,
    // второй шаг - показывает список книг, а значит надо модалку с выбором книг отобразить,
    // третий шаг - показывает карточку, а значит перед ним надо скрыть модалку и т.д.
    console.log(nextStepIndex);
  };

  const steps = [
    {
      element: '.MuiAppBar-root', // нужно проставить классы у нужных элементов потому что с родными MUI не очень удобно
      intro: 'test 1', // и надо придумать текст хэлпов.
    },
    {
      element: '.current',
      intro: 'test 2',
    },
    {
      element: '.verse',
      intro: 'test 3',
    },
  ];
  const options = {
    nextLabel: 'Двльше', // здесь нужно переводы задействовать, в зависимости от локали, типа t('nextLabel')
    prevLabel: 'Prev label',
    doneLabel: 'doneLabel',
    tooltipClass: 'tooltipClass', // а тут стили для тултипов, это уже в самую последнюю очередь можем подправить
    highlightClass: 'highlightClass',
    tooltipPosition: 'auto',
    exitOnEsc: false,
    exitOnOverlayClick: false,
    showBullets: false,
    disableInteraction: true,
  };
  return (
    <Steps
      // тут надо в локалсторэдж может хранить, показыали хэлп или нет. При первом запуске его показать, а дальше показывать только если нажали на кнопку хэлп в меню
      enabled={true}
      steps={steps}
      initialStep={0}
      onBeforeChange={onBeforeChange}
      onExit={() => console.log('exit')}
      options={options}
    />
  );
}

export default Intro;
