import React, { useContext, useRef } from 'react';

import { Steps } from 'intro.js-react';

import 'intro.js/introjs.css';
import { AppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

// TODO
// Надо продумать такой момент, человек может справку в ОБС запустить, а там нет выбора книги, нет карточки Чаптер.
// Я думаю может при запуске хэлпа переключать на Библию?

function Intro() {
  const { t } = useTranslation();
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
      intro: t('introStep0'),
    },
    {
      element: '.intro-appBar',
      intro: t('introStep1'),
    },
    {
      element: '.intro-bookList',
      intro: t('introStep2'),
    },
    {
      element: '.intro-chapterList',
      intro: t('introStep3'),
    },
    {
      element: '.react-grid-layout',
      intro: t('introStep4'),
    },
    {
      element: '.intro-card',
      intro: t('introStep5'),
    },
    {
      element: '.verse',
      intro: t('introStep6'),
    },
    {
      element: '.intro-contextMenu',
      intro: t('introStep7'),
    },
    {
      element: '.intro-reportDialog',
      intro: t('introStep8'),
    },
    {
      element: '.intro-hamburger', //TODO Надо убрать сообщение левее, её кушает экран
      intro: t('introStep9'),
    },
  ];
  const onBeforeChange = (stepIndex) => {
    switch (String(stepIndex)) {
      case '0':
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
        setIntroContextMenuOpen(false);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '7':
        setShowErrorReport(false);
        setIntroContextMenuOpen(true);

        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '8':
        setIntroContextMenuOpen(false);
        setOpenMainMenu(false);
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
    //TODO - если поменять местами с setOpenMainMenu(false), тогда в конце остается фон серый, еслои оставить - ошибка вылазит в anchorEL
    // ещё одна асинхронная задачка
    setLoadIntro(true);
    setOpenMainMenu(false);

    setIntroContextMenuOpen(false);
    setShowErrorReport(false);
    setShowChapterSelect(false);
  };
  const options = {
    nextLabel: 'Дальше', // здесь нужно переводы задействовать, в зависимости от локали, типа t('nextLabel')
    prevLabel: 'Назад',
    doneLabel: 'Закрыть',
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
      enabled={!loadIntro}
      steps={steps}
      ref={stepsRef}
      initialStep={6}
      onBeforeChange={onBeforeChange}
      onExit={onExit}
      options={options}
    />
  );
}

export default Intro;
