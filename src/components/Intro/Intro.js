import React, { useContext, useRef, useState } from 'react';

import { Steps } from 'intro.js-react';

import { ContextMenu } from '../ContextMenu';

import 'intro.js/introjs.css';
import { AppContext, ReferenceContext } from '../../context';
import { useTranslation } from 'react-i18next';

function Intro() {
  const [introContextMenuPosition, setIntroContextMenuPosition] = useState(null);
  const [introContextMenuOpen, setIntroContextMenuOpen] = useState(false);
  const { t } = useTranslation();
  const stepsRef = useRef();

  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const {
    actions: {
      setShowBookSelect,
      setShowChapterSelect,
      setShowErrorReport,
      setLoadIntro,
      setOpenMainMenu,
    },
    state: { loadIntro, showChapterSelect },
  } = useContext(AppContext);

  const openBible = () => {
    const curRef = JSON.parse(localStorage.getItem('reference'))['bible'];
    goToBookChapterVerse(curRef.bookId, curRef.chapter, curRef.verse);
  };

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
      position: 'bottom',
    },
  ];

  React.useEffect(() => {
    if (document.querySelector('.current')) {
      const { top, left } = document.querySelector('.current').getBoundingClientRect();
      setIntroContextMenuPosition({ top: top, left: left });
    }
    // eslint-disable-next-line
  }, [showChapterSelect]); //TODO надо придумать другую зависимость

  const onStart = () => {
    bookId === 'obs' && openBible();
  };

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
      case '5':
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
        setIntroContextMenuOpen(false);
        setShowErrorReport(true);
        setOpenMainMenu(true);
        document.querySelector('.intro-contextMenu').style.opacity = 0;
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
    tooltipClass: 'tooltipClass',
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
      <Steps
        enabled={!loadIntro}
        steps={steps}
        ref={stepsRef}
        initialStep={0}
        onBeforeChange={onBeforeChange}
        onExit={onExit}
        options={options}
        onStart={onStart}
      />
      <ContextMenu
        introClasses={{ paper: 'intro-contextMenu' }}
        introContextMenuPosition={introContextMenuPosition}
        openContextMenu={introContextMenuOpen}
      />
    </>
  );
}

export default Intro;
