import React, { useContext, useRef } from 'react';

import { Steps } from 'intro.js-react';

import 'intro.js/introjs.css';
import { AppContext } from '../../context/AppContext';

// https://github.com/HiDeoo/intro.js-react обертка для реакта
// https://introjs.com/docs/examples/events/confirm-before-exit сама библиотека

// TODO
// Надо продумать такой момент, человек может справку в ОБС запустить, а там нет выбора книги, нет карточки Чаптер.
// Я думаю может при запуске хэлпа переключать на Библию?

function Intro() {
  const stepsRef = useRef();
  const {
    actions: {
      setShowBookSelect,
      setShowChapterSelect,
      setShowErrorReport,
      setLoadIntro,
      setOpenMainMenu,
      setIntroContextMenuOpen,
    },
    state: { loadIntro },
  } = useContext(AppContext);
  const steps = [
    {
      intro:
        'Перед вами интерактивный гид по приложению Bible Study App(BSA). Мы хотим, чтобы вам было проще  разобраться с возможностями BSA. Листайте дальше! ', // и надо придумать текст хэлпов.
    },
    {
      element: '.intro-appBar',
      intro:
        '1.Презентация AppBar. На этой панели представлена кнопка выбора книги и кнопка выбора главы Библии.',
    },
    {
      element: '.intro-bookList', //TODO -добавить
      intro: '2.Здесь выбирете книгу.',
    },
    {
      element: '.intro-chapterList', //TODO -добавить
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
      element: '.intro-contextMenu', //TODO -добавить
      intro:
        '7.При нажатии на любой стих правой кнопкой мыши - откроется контекстное меню.' +
        ' Можно либо скопировать  стих либо отправить сообщение об ошибке в данном стихе.  ',
    },
    {
      element: '.intro-reportDialog', //TODO -добавить
      intro: '8.В окне отправки ошибок необходимо обязательно написать комментарий..   ',
    },
    {
      element: '.intro-hamburger', //TODO Найти возможность добавить класс
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
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '2':
        setShowBookSelect(true);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '3':
        setShowBookSelect(false);
        setShowChapterSelect(true);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '4':
        setShowChapterSelect(false);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '6':
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '7':
        setIntroContextMenuOpen(true);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '8':
        setIntroContextMenuOpen(false);
        setShowErrorReport(true);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '9':
        setShowErrorReport(false);
        setOpenMainMenu(true);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      default:
        break;
    }
  };
  const onExit = () => {
    setLoadIntro(true); //TODO - если поменять местами с setOpenMainMenu(false), тогда в конце остается фон серый, еслои оставить - ошибка вылазит в anchorEL
    setOpenMainMenu(false);
    setIntroContextMenuOpen(false);
    setShowErrorReport(false);
    setShowChapterSelect(false);
  };
  const options = {
    nextLabel: 'Дальше', // здесь нужно переводы задействовать, в зависимости от локали, типа t('nextLabel')
    prevLabel: 'Назад',
    doneLabel: 'Хватит!',
    tooltipClass: 'tooltipClass', // а тут стили для тултипов, это уже в самую последнюю очередь можем подправить
    highlightClass: 'highlightClass',
    tooltipPosition: 'auto',
    hidePrev: true,
    hideNext: true,
    overlayOpacity: 0.6,
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
      onExit={onExit}
      options={options}
    />
  );
}

export default Intro;
