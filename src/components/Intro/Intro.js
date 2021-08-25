import React, { useContext, useRef } from 'react';

import { Steps } from 'intro.js-react';

import { ContextMenu } from '../ContextMenu';

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
      setIntroContextMenuPosition,
    },
    state: { loadIntro, showChapterSelect },
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

  React.useEffect(() => {
    if (document.querySelector('.current')) {
      const { top, left } = document.querySelector('.current').getBoundingClientRect();
      setIntroContextMenuPosition({ top: top, left: left });
    }
    // eslint-disable-next-line
  }, [showChapterSelect]); //TODO надо придумать другую зависимость

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
        document.querySelector('.intro-contextMenu').style.opacity = 0;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '7':
        setIntroContextMenuOpen(true);
        setShowErrorReport(false);
        document.querySelector('.intro-contextMenu').style.opacity = 1;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '8':
        document.querySelector('.intro-contextMenu').style.opacity = 0;
        setIntroContextMenuOpen(false);
        setShowErrorReport(true);
        setOpenMainMenu(true);
        document.querySelector('.intro-hamburger').style.opacity = 0;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '9':
        setIntroContextMenuOpen(false);
        setShowErrorReport(false);
        document.querySelector('.intro-hamburger').style.opacity = 1;
        stepsRef.current.updateStepElement(stepIndex);

        break;
      default:
        break;
    }
  };
  const onExit = () => {
    setLoadIntro(true);
    setOpenMainMenu(false);
    setIntroContextMenuOpen(false);
    setShowErrorReport(false);
    setShowChapterSelect(false);
  };
  const options = {
    nextLabel: t('Next'),
    prevLabel: t('Previous'),
    doneLabel: t('Done'),
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
    <>
      {' '}
      <Steps
        enabled={!loadIntro}
        steps={steps}
        ref={stepsRef}
        initialStep={0}
        onBeforeChange={onBeforeChange}
        onExit={onExit}
        options={options}
      />
      <ContextMenu introClasses={{ paper: 'intro-contextMenu' }} />
    </>
  );
}

export default Intro;
