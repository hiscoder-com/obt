import React, { useState, useContext } from 'react';
import { Canvas } from '@texttree/bible-verse-image';
import DialogUI from '../DialogUI/DialogUI';
import { AppContext, ReferenceContext } from '../../context';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Grid,
  Container,
  Typography,
} from '@material-ui/core';

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
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [canvasKey, setCanvasKey] = useState(0);

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
  const template2 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1490735891913-40897cdaafd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
  ];

  const selectedTemplateData = selectedTemplate === 'template1' ? template1 : template2;

  const canvasStyle = {
    height: '500px',
    width: '500px',
  };

  const updateCanvasKey = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Canvas
            key={canvasKey}
            style={canvasStyle}
            infocanvas={infocanvas}
            elements={selectedTemplateData}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Настройки:</Typography>
          <FormControl>
            <InputLabel htmlFor="templateSelect">Выберите шаблон:</InputLabel>
            <Select
              id="templateSelect"
              value={selectedTemplate}
              onChange={(e) => {
                setSelectedTemplate(e.target.value);
                updateCanvasKey();
              }}
            >
              <MenuItem value="template1">Шаблон 1</MenuItem>
              <MenuItem value="template2">Шаблон 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            id="fontSize"
            label="Размер шрифта"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
          <FormControl>
            <InputLabel htmlFor="fontStyle">Стиль шрифта:</InputLabel>
            <Select id="fontStyle" value={fontStyle} onChange={handleFontStyleChange}>
              <MenuItem value="800">Обычный</MenuItem>
              <MenuItem value="italic">Курсив</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="color"
            id="fillStyle"
            label="Цвет текста"
            value={fillStyle}
            onChange={handleFillStyleChange}
          />
          <TextField
            type="number"
            id="blockWidth"
            label="Ширина блока"
            value={blockWidth}
            onChange={handleBlockWidthChange}
          />
          <FormControl>
            <InputLabel htmlFor="alignment">Выравнивание:</InputLabel>
            <Select id="alignment" value={alignment} onChange={handleAlignmentChange}>
              <MenuItem value="left">Слева</MenuItem>
              <MenuItem value="center">По центру</MenuItem>
              <MenuItem value="right">Справа</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            step="0.1"
            id="letterSpacing"
            label="Межбуквенное расстояние"
            value={letterSpacing}
            onChange={handleLetterSpacingChange}
          />
          <TextField
            type="number"
            step="0.1"
            id="lineHeight"
            label="Межстрочный интервал"
            value={lineHeight}
            onChange={handleLineHeightChange}
          />
          <TextField
            type="number"
            step="1"
            id="textX"
            label="X координата текста"
            value={textX}
            onChange={handleTextXChange}
          />
          <TextField
            type="number"
            step="1"
            id="textY"
            label="Y координата текста"
            value={textY}
            onChange={handleTextYChange}
          />
        </Grid>
      </Grid>
    </Container>
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
