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
      intro: t('introStart'),
    },
    {
      element: '.intro-appBar',
      intro: t('introAppBar'),
    },
    {
      element: '.intro-bookList',
      intro: t('introBookList'),
    },
    {
      element: '.intro-chapterList',
      intro: t('introChapterList'),
    },
    {
      intro: t('introShortCuts'),
    },
    {
      element: '.react-grid-layout',
      intro: t('introWorkSpace'),
    },
    {
      element: '.intro-card',
      intro: t('introCard'),
    },
    {
      element: '.verse',
      intro: t('introVerse'),
    },
    {
      element: '.intro-contextMenu',
      intro: t('introContextMenu'),
    },
    {
      element: '.intro-reportDialog',
      intro: t('introReportDialog'),
    },
    {
      element: '.intro-hamburger',
      intro: t('introHamburger'),
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
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '7':
        setIntroContextMenuOpen(true);
        document.querySelector('.intro-contextMenu').style.opacity = 0;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '8':
        setShowErrorReport(false);
        document.querySelector('.intro-contextMenu').style.opacity = 1;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '9':
        setShowErrorReport(true);
        setOpenMainMenu(true);
        document.querySelector('.intro-hamburger').style.opacity = 0;
        setIntroContextMenuOpen(true);
        document.querySelector('.intro-contextMenu').style.opacity = 0;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '10':
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
    setShowBookSelect(false);
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
