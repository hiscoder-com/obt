import React, { useContext, useRef, useState } from 'react';

import { Steps } from 'intro.js-react';
import { useTranslation } from 'react-i18next';
import { ContextMenu } from '../../components';

import { AppContext, ReferenceContext } from '../../context';

import 'intro.js/introjs.css';

const initialPosition = {
  left: null,
  top: null,
};

function Intro() {
  const [introContextMenuPosition, setIntroContextMenuPosition] =
    useState(initialPosition);
  const [currentVersePosition, setCurrentVersePosition] = useState(initialPosition);
  const [, setIntroContextMenuOpen] = useState(false);
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
      setCurrentVersePosition({ top, left });
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
        setIntroContextMenuPosition(initialPosition);
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '7':
        setIntroContextMenuPosition(currentVersePosition);
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
        setIntroContextMenuPosition(currentVersePosition);
        document.querySelector('.intro-contextMenu').style.opacity = 0;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      case '10':
        setIntroContextMenuPosition(initialPosition);
        setShowErrorReport(false);
        document.querySelector('.intro-hamburger').style.opacity = 1;
        stepsRef.current.updateStepElement(stepIndex);
        break;
      default:
        break;
    }
  };
  const onExit = () => {
    setLoadIntro(false);
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
    nextToDone: true,
    hidePrev: true,
    overlayOpacity: 0.6,
    exitOnEsc: false,
    exitOnOverlayClick: false,
    showBullets: false,
    disableInteraction: true,
  };

  return (
    <>
      <Steps
        enabled={loadIntro}
        steps={steps}
        ref={stepsRef}
        initialStep={0}
        onBeforeChange={onBeforeChange}
        onExit={onExit}
        options={options}
        onStart={onStart}
      />
      <ContextMenu
        PopoverClasses={{ paper: 'intro-contextMenu' }}
        position={introContextMenuPosition}
      />
    </>
  );
}

export default Intro;
