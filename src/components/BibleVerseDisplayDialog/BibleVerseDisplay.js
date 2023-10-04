import React, { useState, useContext } from 'react';
import { Canvas } from '@texttree/bible-verse-image';
import { ReferenceContext } from '../../context';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Grid,
  Container,
} from '@material-ui/core';

const BibleVerseDisplay = () => {
  const [fontSize, setFontSize] = useState(65);
  const [fontStyle, setFontStyle] = useState('800');
  const [fontTheme, setFontTheme] = useState('Alumni Sans');

  const [fillStyle, setFillStyle] = useState('white');
  const [blockWidth, setBlockWidth] = useState(900);
  const [alignment, setAlignment] = useState('center');

  const [fillStyleOval, setFillStyleOval] = useState('pink');

  const [letterSpacing, setLetterSpacing] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const [textX, setTextX] = useState(200);
  const [textY, setTextY] = useState(260);
  const [textRefY, setTextRefY] = useState(1100);

  const [selectedTemplate, setSelectedTemplate] = useState('template3');
  const [canvasKey, setCanvasKey] = useState(0);

  const {
    state: { referenceBlock },
  } = useContext(ReferenceContext);

  const { bookId, chapter, verse, text } = referenceBlock;

  const handleFontChange = (e) => {
    setFontTheme(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
  };

  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
  };

  const handleFillStyleChange = (e) => {
    setFillStyle(e.target.value);
  };

  const handleFillStyleOvalChange = (e) => {
    setFillStyleOval(e.target.value);
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

  const handleTextRefYChange = (e) => {
    setTextRefY(Number(e.target.value));
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
        filter: 'contrast(104%) brightness(104%)',
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
      x: 200,
      y: 260,
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: 200,
      y: 1100,
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
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
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
    {
      id: 2,
      type: 'oval',
      x: 630,
      y: 630,
      radiusX: 525,
      radiusY: 525,
      props: {
        fillColor: fillStyleOval,
        filter: 'opacity(.50)',
      },
    },
    {
      id: 6,
      type: 'text',
      x: textX, //200
      y: textY, //350
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: textX, //200
      y: textRefY, //755
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth, //892
        lineHeight,
        letterSpacing,
      },
    },
  ];

  const template3 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1696376732843-99bdf0035629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80  ',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%)',
      },
    },
    {
      type: 'rectangle',
      x: 150,
      y: 150,
      width: 1000,
      height: 1000,
      props: {
        fillColor: 'blue',
        strokeColor: 'black',
        strokeWidth: 1,
        filter: 'opacity(.2)',
      },
    },
    {
      id: 6,
      type: 'text',
      x: 200,
      y: 260,
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: 200,
      y: 1100,
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },
  ];
  const template4 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
    {
      type: 'rectangle',
      x: 0,
      y: 250,
      width: 1280,
      height: 800,
      props: {
        fillColor: 'green',
        strokeColor: 'black',
        strokeWidth: 1,
        filter: 'opacity(.2)',
      },
    },

    {
      id: 6,
      type: 'text',
      x: 200, //200
      y: 350, //350
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: textX, //200
      y: textRefY, //755
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth, //892
        lineHeight,
        letterSpacing,
      },
    },
  ];

  const template5 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1696325905035-74fdaebbb68d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80',
      props: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
      },
    },
    {
      type: 'rectangle',
      x: 200,
      y: 350,
      width: 900,
      height: 400,
      props: {
        fillColor: 'green',
        strokeColor: 'black',
        strokeWidth: 1,
        filter: 'opacity(.2)',
      },
    },
    {
      type: 'triangle',
      vertex1: { x: 230, y: 300 },
      vertex2: { x: 230, y: 540 },
      vertex3: { x: 200, y: 540 },
      props: {
        fillColor: 'green',
        strokeColor: 'black',
        strokeWidth: 1,
        filter: 'opacity(.2)',
      },
    },
    {
      id: 6,
      type: 'text',
      x: 200,
      y: 380,
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: 200,
      y: 1100,
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },
  ];
  const template6 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
    {
      id: 2,
      type: 'oval',
      x: 630,
      y: 630,
      radiusX: 525,
      radiusY: 525,
      props: {
        fillColor: fillStyleOval,
        filter: 'opacity(.50)',
      },
    },
    {
      id: 6,
      type: 'text',
      x: textX, //200
      y: textY, //350
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: textX, //200
      y: textRefY, //755
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth, //892
        lineHeight,
        letterSpacing,
      },
    },
  ];

  const template7 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
    {
      id: 2,
      type: 'oval',
      x: 630,
      y: 630,
      radiusX: 525,
      radiusY: 525,
      props: {
        fillColor: fillStyleOval,
        filter: 'opacity(.50)',
      },
    },
    {
      id: 6,
      type: 'text',
      x: textX, //200
      y: textY, //350
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: textX, //200
      y: textRefY, //755
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth, //892
        lineHeight,
        letterSpacing,
      },
    },
  ];

  const template8 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
    {
      id: 2,
      type: 'oval',
      x: 630,
      y: 630,
      radiusX: 525,
      radiusY: 525,
      props: {
        fillColor: fillStyleOval,
        filter: 'opacity(.50)',
      },
    },
    {
      id: 6,
      type: 'text',
      x: textX, //200
      y: textY, //350
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: textX, //200
      y: textRefY, //755
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth, //892
        lineHeight,
        letterSpacing,
      },
    },
  ];

  const template9 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
    {
      id: 2,
      type: 'oval',
      x: 630,
      y: 630,
      radiusX: 525,
      radiusY: 525,
      props: {
        fillColor: fillStyleOval,
        filter: 'opacity(.50)',
      },
    },
    {
      id: 6,
      type: 'text',
      x: textX, //200
      y: textY, //350
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: textX, //200
      y: textRefY, //755
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth, //892
        lineHeight,
        letterSpacing,
      },
    },
  ];

  const template10 = [
    {
      id: 1,
      type: 'background',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
    {
      id: 2,
      type: 'oval',
      x: 630,
      y: 630,
      radiusX: 525,
      radiusY: 525,
      props: {
        fillColor: fillStyleOval,
        filter: 'opacity(.50)',
      },
    },
    {
      id: 6,
      type: 'text',
      x: textX, //200
      y: textY, //350
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      id: 7,
      type: 'text',
      x: textX, //200
      y: textRefY, //755
      text: `${bookId} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment,
        blockWidth, //892
        lineHeight,
        letterSpacing,
      },
    },
  ];

  const selectedTemplateData =
    selectedTemplate === 'template1'
      ? template1
      : selectedTemplate === 'template2'
      ? template2
      : selectedTemplate === 'template3'
      ? template3
      : selectedTemplate === 'template4'
      ? template4
      : selectedTemplate === 'template5'
      ? template5
      : selectedTemplate === 'template6'
      ? template6
      : selectedTemplate === 'template7'
      ? template7
      : selectedTemplate === 'template8'
      ? template8
      : selectedTemplate === 'template9'
      ? template9
      : template10;

  const canvasStyle = {
    height: '500px',
    width: '500px',
  };

  const groopsStyle = {
    width: '200px',
    paddingBottom: '10px',
  };
  const updateCanvasKey = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Canvas
            key={canvasKey}
            style={canvasStyle}
            infocanvas={infocanvas}
            elements={selectedTemplateData}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl style={groopsStyle}>
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
              <MenuItem value="template3">Шаблон 3</MenuItem>
              <MenuItem value="template4">Шаблон 4</MenuItem>
              <MenuItem value="template5">Шаблон 5</MenuItem>
              <MenuItem value="template6">Шаблон 6</MenuItem>
              <MenuItem value="template7">Шаблон 7</MenuItem>
              <MenuItem value="template8">Шаблон 8</MenuItem>
              <MenuItem value="template9">Шаблон 9</MenuItem>
              <MenuItem value="template10">Шаблон 10</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            type="number"
            id="fontSize"
            label="Размер шрифта"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
          <FormControl style={groopsStyle}>
            <InputLabel htmlFor="fontStyle">Стиль шрифта:</InputLabel>
            <Select id="fontStyle" value={fontStyle} onChange={handleFontStyleChange}>
              <MenuItem value="800">Обычный</MenuItem>
              <MenuItem value="italic">Курсив</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl style={groopsStyle}>
            <InputLabel htmlFor="fontSelect">Выберите шрифт:</InputLabel>
            <Select id="fontSelect" value={fontTheme} onChange={handleFontChange}>
              <MenuItem value="Alumni Sans">Alumni Sans</MenuItem>
              <MenuItem value="Calibri">Calibri</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
            </Select>
          </FormControl>
          <TextField
            style={{ width: '100px', paddingBottom: '10px' }}
            type="color"
            id="fillStyle"
            label="Цвет текста"
            value={fillStyle}
            onChange={handleFillStyleChange}
          />
          <br />
          <TextField
            type="number"
            id="blockWidth"
            label="Ширина блока"
            value={blockWidth}
            onChange={handleBlockWidthChange}
          />
          <FormControl style={groopsStyle}>
            <InputLabel htmlFor="alignment">Выравнивание:</InputLabel>
            <Select id="alignment" value={alignment} onChange={handleAlignmentChange}>
              <MenuItem value="left">Слева</MenuItem>
              <MenuItem value="center">По центру</MenuItem>
              <MenuItem value="right">Справа</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            type="number"
            id="letterSpacing"
            label="Межбуквенное расстояние"
            value={letterSpacing}
            onChange={handleLetterSpacingChange}
            inputProps={{ step: 0.1 }}
          />
          <TextField
            type="number"
            id="lineHeight"
            label="Межстрочный интервал"
            value={lineHeight}
            onChange={handleLineHeightChange}
            inputProps={{ step: 0.1 }}
          />
          <Grid
            container
            spacing={3}
            style={{ paddingTop: '20px', paddingLeft: '10px', paddingBottom: '20px' }}
          >
            <TextField
              type="number"
              step="1"
              id="textX"
              label="X координата текста"
              value={textX}
              onChange={handleTextXChange}
            />
            <TextField
              style={{ paddingBottom: '10px' }}
              type="number"
              step="1"
              id="textY"
              label="Y координата текста"
              value={textY}
              onChange={handleTextYChange}
            />
            <TextField
              type="number"
              step="1"
              id="textRefY"
              label="Y координата cсылки"
              value={textRefY}
              onChange={handleTextRefYChange}
            />
            <TextField
              style={{ width: '100px', paddingBottom: '10px' }}
              type="color"
              id="fillStyle"
              label="Цвет круга"
              value={fillStyleOval}
              onChange={handleFillStyleOvalChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BibleVerseDisplay;
