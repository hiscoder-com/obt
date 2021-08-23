import React, { useContext, useRef } from 'react';

import { Steps } from 'intro.js-react';

import 'intro.js/introjs.css';
import { AppContext } from '../../context/AppContext';

// https://github.com/HiDeoo/intro.js-react обертка для реакта
// https://introjs.com/docs/examples/events/confirm-before-exit сама библиотека

function Intro() {
  const stepsRef = useRef();
  const {
    actions: {
      setShowBookSelect,
      setShowChapterSelect,
      setShowErrorReport,
      setLoadIntro,
    },
    state: { loadIntro },
  } = useContext(AppContext);
  const steps = [
    {
      element: '.root',
      intro:
        'Перед вами интерактивный гид по приложению Bible Study App(BSA). Мы хотим, чтобы вам было проще  разобраться с возможностями BSA. Листайте дальше! ', // и надо придумать текст хэлпов.
    },
    {
      element: '.intro-appBar',
      intro:
        '1.Презентация AppBar. На этой панели представлена кнопка выбора книги и кнопка выбора главы Библии.',
    },
    {
      element: '.intro-bookList',
      intro: '2.Здесь выбирете книгу.',
    },
    {
      element: '.intro-chapterSelect',
      intro: '3.Здесь выбираете нужную главу',
    },
    {
      element: '.react-grid-layout',
      intro: '4.Это окно Workspace. В нём находятся карточки.',
    },
    {
      element: '.intro-card',
      intro:
        '5.В каждой отдельной карточке показывается конкретный перевод Бибилии,' +
        'ОБС или дополнтельные инструменты: TN,TQ.' +
        'Карточки можно перемещать, менять размер, удалять.' +
        'Невозможно удалить последнюю карточку с Библией или ОБС.',
    },
    {
      element: '.verse',
      intro:
        '6.С каждым стихом можно работать отдельно. При клике на него текущий референс меняется.  ',
    },
    {
      element: '.intro-contextMenu',
      intro:
        '7.При нажатии на любой стих правой кнопкой мыши - откроется контекстное меню.' +
        ' Можно либо скопировать  стих либо отправить сообщение об ошибке в данном стихе.  ',
    },
    {
      element: '.intro-reportDialog',
      intro: '8.В окне отправки ошибок необходимо обязательно написать комментарий..   ',
    },
    {
      element: '.introMenu',
      intro:
        '9.В меню можно управлять наполнением Workspace: добавить новую карточку , ' +
        'переключаться между ОБС и Библией, сбросить состояние Workspace к значению по-умолчанию' +
        ', поменять разщмер шрифта в карточках, поменять язык интерфейса.',
    },
  ];
  const onBeforeChange = (stepIndex) => {
    switch (String(stepIndex)) {
      case '0':
        console.log('stepsRef', stepsRef.current);
        break;
      case '1':
        setShowBookSelect(false);
        setShowChapterSelect(false);

        break;
      case '2':
        setShowBookSelect(true);
        console.log('stepsRef.current', stepsRef.current);
        break;
      case '3':
        setShowBookSelect(false);
        setShowChapterSelect(true);
        console.log('stepsRef.current', stepsRef.current);
        break;
      case '4':
        setShowChapterSelect(false);
        break;
      case '6':
        setShowChapterSelect(false);
        break;
      case '7':
        // TODO: вытащить событие открытия контекстного меню
        setShowErrorReport(false);
        break;
      case '8':
        setShowErrorReport(true);
        break;
      case '9':
        setShowErrorReport(false);
        // TODO: вытащить событие открытия  меню гамбургера
        break;
      default:
        break;
    }
  };

  const options = {
    nextLabel: 'Дальше', // здесь нужно переводы задействовать, в зависимости от локали, типа t('nextLabel')
    prevLabel: 'Назад',
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
      //  показыали хэлп или нет. При первом запуске его показать, а дальше показывать только если нажали на кнопку хэлп в меню

      enabled={!loadIntro}
      steps={steps}
      ref={stepsRef}
      initialStep={0}
      onBeforeChange={onBeforeChange}
      onExit={(re) => setLoadIntro((prev) => (prev = true))}
      options={options}
    />
  );
}

export default Intro;
