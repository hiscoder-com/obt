import React, { useState, useContext } from 'react';
import { Canvas } from '@texttree/bible-verse-image';
import DialogUI from '../DialogUI/DialogUI';
import { AppContext, ReferenceContext } from '../../context';

const BibleVerseDisplayWithOptions = () => {
  const [fontSize, setFontSize] = useState(50);
  const [fontStyle, setFontStyle] = useState('800');
  const [fillStyle, setFillStyle] = useState('white');
  const [blockWidth, setBlockWidth] = useState(480);
  const [alignment, setAlignment] = useState('center');
  const [letterSpacing, setLetterSpacing] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [textX, setTextX] = useState(180);
  const [textY, setTextY] = useState(200);

  const {
    state: { referenceBlock },
  } = useContext(ReferenceContext);

  const { bookId, chapter, verse, text } = referenceBlock;

  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
  };

  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
  };

  const handleFillStyleChange = (e) => {
    setFillStyle(e.target.value);
  };

  const handleBlockWidthChange = (e) => {
    setBlockWidth(Number(e.target.value));
  };

  const handleAlignmentChange = (e) => {
    setAlignment(e.target.value);
  };

  const handleLetterSpacingChange = (e) => {
    setLetterSpacing(Number(e.target.value));
  };

  const handleLineHeightChange = (e) => {
    setLineHeight(Number(e.target.value));
  };

  const handleTextXChange = (e) => {
    setTextX(Number(e.target.value));
  };

  const handleTextYChange = (e) => {
    setTextY(Number(e.target.value));
  };

  const infocanvas = {
    height: 1280,
    width: 1280,
  };

  const template1 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1517685704588-0935ac847be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
    {
      id: 2,
      type: 'line',
      x1: 40,
      y1: 40,
      x2: 40,
      y2: 1240,
      props: {
        lineColor: '#fff4',
        lineWidth: 15,
      },
    },

    {
      id: 3,
      type: 'line',
      x1: 1240,
      y1: 40,
      x2: 1240,
      y2: 1240,
      props: {
        lineColor: '#fff4',
        lineWidth: 15,
      },
    },

    {
      id: 4,
      type: 'line',
      x1: 40,
      y1: 40,
      x2: 1240,
      y2: 40,
      props: {
        lineColor: '#fff4',
        lineWidth: 15,
      },
    },
    {
      id: 5,
      type: 'line',
      x1: 40,
      y1: 1240,
      x2: 1240,
      y2: 1240,
      props: {
        lineColor: '#fff4',
        lineWidth: 15,
      },
    },

    {
      id: 6,
      type: 'text',
      x: textX,
      y: textY,
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: 'Alumni Sans',
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: 420,
      y: 800,
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: 'Alumni Sans',
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },
  ];

  const canvasStyle = {
    height: '500px',
    width: '500px',
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Canvas style={canvasStyle} infocanvas={infocanvas} elements={template1} />
        <div style={{ flex: 1, paddingLeft: '10px' }}>
          <div>
            <label htmlFor="fontSize">Размер шрифта:</label>
            <input
              type="number"
              id="fontSize"
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </div>
          <div>
            <label htmlFor="fontStyle">Стиль шрифта:</label>
            <select id="fontStyle" value={fontStyle} onChange={handleFontStyleChange}>
              <option value="800">Обычный</option>
              <option value="italic">Курсив</option>
            </select>
          </div>
          <div>
            <label htmlFor="fillStyle">Цвет текста:</label>
            <input
              type="color"
              id="fillStyle"
              value={fillStyle}
              onChange={handleFillStyleChange}
            />
          </div>
          <div>
            <label htmlFor="blockWidth">Ширина блока:</label>
            <input
              type="number"
              id="blockWidth"
              value={blockWidth}
              onChange={handleBlockWidthChange}
            />
          </div>
          <div>
            <label htmlFor="alignment">Выравнивание:</label>
            <select id="alignment" value={alignment} onChange={handleAlignmentChange}>
              <option value="left">Слева</option>
              <option value="center">По центру</option>
              <option value="right">Справа</option>
            </select>
          </div>
          <div>
            <label htmlFor="letterSpacing">Межбуквенное расстояние:</label>
            <input
              type="number"
              step="0.1"
              id="letterSpacing"
              value={letterSpacing}
              onChange={handleLetterSpacingChange}
            />
          </div>
          <div>
            <label htmlFor="lineHeight">Межстрочный интервал:</label>
            <input
              type="number"
              step="0.1"
              id="lineHeight"
              value={lineHeight}
              onChange={handleLineHeightChange}
            />
            <div>
              <label htmlFor="textX">X координата текста:</label>
              <input
                type="number"
                step="1"
                id="textX"
                value={textX}
                onChange={handleTextXChange}
              />
            </div>
            <div>
              <label htmlFor="textY">Y координата текста:</label>
              <input
                type="number"
                step="1"
                id="textY"
                value={textY}
                onChange={handleTextYChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BibleVerseDisplayDialog = ({ onClose }) => {
  const {
    state: { showBibleVerse },
    actions: { setShowBibleVerse },
  } = useContext(AppContext);

  const handleCancel = () => {
    setShowBibleVerse(false);
  };

  return (
    <DialogUI
      primary={{
        text: 'Закрыть',
        onClick: onClose,
      }}
      maxWidth="lg"
      open={showBibleVerse}
      onClose={handleCancel}
      title="Отображение стиха с настройками"
    >
      <BibleVerseDisplayWithOptions />
    </DialogUI>
  );
};

export default BibleVerseDisplayDialog;
