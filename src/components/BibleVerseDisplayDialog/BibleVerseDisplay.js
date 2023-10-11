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
import { useTranslation } from 'react-i18next';

const BibleVerseDisplay = () => {
  const [fontSize, setFontSize] = useState(80);
  const [fontStyle, setFontStyle] = useState('800');
  const [fontTheme, setFontTheme] = useState('Calibri');

  const [fillStyle, setFillStyle] = useState('white');
  const [blockWidth, setBlockWidth] = useState(900);
  const [alignment, setAlignment] = useState('center');

  const [letterSpacing, setLetterSpacing] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [canvasKey, setCanvasKey] = useState(0);

  const { t } = useTranslation();

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

  const infocanvas = {
    height: 1280,
    width: 1280,
  };

  function getBook(bookId) {
    return t(`${bookId}_abbr`);
  }

  const template1 = [
    {
      type: 'background',
      url: 'https://images.unsplash.com/photo-1641912076456-c23ac41bdd58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      props: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        filter: 'contrast(84%) brightness(114%)',
      },
    },
    {
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
      type: 'text',
      x: 200,
      y: 1130,
      text: `${getBook(bookId)} ${chapter}:${verse}`,
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
      type: 'oval',
      x: 630,
      y: 630,
      radiusX: 525,
      radiusY: 525,
      props: {
        fillColor: 'green',
        strokeColor: 'green',
        filter: 'opacity(.30)',
      },
    },
    {
      type: 'text',
      x: 200,
      y: 350,
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
      type: 'text',
      x: 200,
      y: 950,
      text: `${getBook(bookId)} ${chapter}:${verse}`,
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

  const template3 = [
    {
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
      type: 'text',
      x: 200,
      y: 1160,
      text: `${getBook(bookId)} ${chapter}:${verse}`,
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
        strokeColor: 'green',
        strokeWidth: 1,
        filter: 'opacity(.2)',
      },
    },

    {
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
      type: 'text',
      x: 200, //200
      y: 755, //755
      text: `${getBook(bookId)} ${chapter}:${verse}`,
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
      x: 100,
      y: 300,
      width: 1080,
      height: 680,
      props: {
        fillColor: 'white',
        strokeColor: 'white',
        strokeWidth: 1,
        filter: 'opacity(.2)',
      },
    },
    {
      type: 'text',
      x: 200,
      y: 480,
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
      type: 'text',
      x: 200,
      y: 1100,
      text: `${getBook(bookId)} ${chapter}:${verse}`,
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
      type: 'background',
      url: 'https://plus.unsplash.com/premium_photo-1681774171279-7fbfa8760c26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
      props: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.96)',
      },
    },
    {
      type: 'image',
      url: 'https://img.icons8.com/?size=48&id=95776&format=png',
      props: {
        zoom: 3,
        offsetX: 950,
        offsetY: 150,
        filter: 'invert(100%)',
      },
    },
    {
      type: 'image',
      url: 'https://img.icons8.com/?size=48&id=95776&format=png',
      props: {
        zoom: 3,
        offsetX: 850,
        offsetY: 150,
        filter: 'invert(100%)',
      },
    },
    {
      type: 'image',
      url: 'https://img.icons8.com/?size=48&id=95776&format=png',
      props: {
        zoom: 3,
        offsetX: 750,
        offsetY: 150,
        filter: 'invert(100%)',
      },
    },

    {
      type: 'image',
      url: 'https://img.icons8.com/?size=48&id=95776&format=png',
      props: {
        zoom: 3,
        offsetX: 650,
        offsetY: 150,
        filter: 'invert(100%)',
      },
    },
    {
      type: 'image',
      url: 'https://img.icons8.com/?size=48&id=101226&format=png',
      props: {
        zoom: 3,
        offsetX: 150,
        offsetY: 950,
        filter: 'invert(100%)',
      },
    },
    {
      type: 'image',
      url: 'https://img.icons8.com/?size=48&id=101226&format=png',
      props: {
        zoom: 3,
        offsetX: 250,
        offsetY: 950,
        filter: 'invert(100%)',
      },
    },
    {
      type: 'image',
      url: 'https://img.icons8.com/?size=48&id=101226&format=png',
      props: {
        zoom: 3,
        offsetX: 350,
        offsetY: 950,
        filter: 'invert(100%)',
      },
    },
    {
      type: 'image',
      url: 'https://img.icons8.com/?size=48&id=101226&format=png',
      props: {
        zoom: 3,
        offsetX: 450,
        offsetY: 950,
        filter: 'invert(100%)',
      },
    },
    {
      type: 'line',
      x1: 265,
      y1: 810,
      x2: 675,
      y2: 810,
      props: {
        lineColor: 'white',
        lineWidth: 12,
      },
    },

    {
      type: 'text',
      x: 250, //200
      y: 350, //350
      text: text,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment: 'left',
        blockWidth,
        lineHeight,
        letterSpacing,
      },
    },

    {
      type: 'text',
      x: 730, //200
      y: 755, //755
      text: `${getBook(bookId)} ${chapter}:${verse}`,
      props: {
        fillStyle,
        fontStyle,
        fontSize,
        font: fontTheme,
        alignment: 'left',
        blockWidth, //892
        lineHeight,
        letterSpacing,
      },
    },
  ];

  const template7 = [
    {
      type: 'background',
      url: 'https://images.unsplash.com/photo-1657804942950-ba961408feb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZvbiUyMGdyZXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
      },
    },
    {
      type: 'line',
      x1: 165,
      y1: 310,
      x2: 165,
      y2: 500,
      props: {
        lineColor: 'black',
        lineWidth: 15,
      },
    },
    {
      type: 'line',
      x1: 158,
      y1: 310,
      x2: 1122,
      y2: 310,
      props: {
        lineColor: 'black',
        lineWidth: 15,
      },
    },
    {
      type: 'line',
      x1: 1115,
      y1: 310,
      x2: 1115,
      y2: 500,
      props: {
        lineColor: 'black',
        lineWidth: 15,
      },
    },
    {
      type: 'line',
      x1: 158,
      y1: 815,
      x2: 1122,
      y2: 815,
      props: {
        lineColor: 'black',
        lineWidth: 15,
      },
    },
    {
      type: 'line',
      x1: 165,
      y1: 640,
      x2: 165,
      y2: 822,
      props: {
        lineColor: 'black',
        lineWidth: 15,
      },
    },
    {
      type: 'line',
      x1: 1115,
      y1: 640,
      x2: 1115,
      y2: 822,
      props: {
        lineColor: 'black',
        lineWidth: 15,
      },
    },
    {
      type: 'image',
      url: 'https://img.icons8.com/?size=80&id=yDqe48ajIYmU&format=png',
      props: {
        zoom: 1,
        offsetX: 1085,
        offsetY: 530,
      },
    },
    {
      type: 'image',
      url: 'https://img.icons8.com/?size=80&id=3WbxGrgDDLw0&format=png',
      props: {
        zoom: 1,
        offsetX: 130,
        offsetY: 530,
      },
    },
    {
      type: 'text',
      x: 200, //200
      y: 350, //350
      text: text,
      props: {
        fillStyle: 'black',
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
      type: 'text',
      x: 200, //200
      y: 855, //755
      text: `${getBook(bookId)} ${chapter}:${verse}`,
      props: {
        fillStyle: 'black',
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
      type: 'background',
      url: 'https://images.unsplash.com/photo-1592856908193-b9934576cf3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmllbGR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        filter: 'contrast(84%) brightness(104%) opacity(.96)',
      },
    },
    {
      type: 'rectangle',
      x: 150,
      y: 150,
      width: 1000,
      height: 1000,
      props: {
        fillColor: '#FFDAB9',
        strokeColor: '#FFDAB9',
        strokeWidth: 1,
        filter: 'opacity(.7)',
      },
    },
    {
      type: 'line',
      x1: 120,
      y1: 120,
      x2: 120,
      y2: 1180,
      props: {
        lineColor: '#fff4',
        lineWidth: 15,
      },
    },

    {
      type: 'line',
      x1: 1180,
      y1: 120,
      x2: 1180,
      y2: 1180,
      props: {
        lineColor: '#fff4',
        lineWidth: 15,
      },
    },

    {
      type: 'line',
      x1: 120,
      y1: 120,
      x2: 1180,
      y2: 120,
      props: {
        lineColor: '#fff4',
        lineWidth: 15,
      },
    },
    {
      type: 'line',
      x1: 120,
      y1: 1180,
      x2: 1180,
      y2: 1180,
      props: {
        lineColor: '#fff4',
        lineWidth: 15,
      },
    },
    {
      type: 'text',
      x: 200, //200
      y: 350, //350
      text: text,
      props: {
        fillStyle: '#75340D',
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
      type: 'text',
      x: 200, //200
      y: 755, //755
      text: `${getBook(bookId)} ${chapter}:${verse}`,
      props: {
        fillStyle: '#75340D',
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
      type: 'background',
      url: 'https://images.unsplash.com/photo-1550293027-413930c70034?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      props: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        filter: 'contrast(84%) brightness(104%) opacity(.96)',
      },
    },
    {
      type: 'image',
      url: 'https://bogatyr.club/uploads/posts/2023-03/thumbs/1678094738_bogatyr-club-p-mazok-kisti-foni-vkontakte-78.png',
      props: {
        zoom: 1,
        offsetX: 150,
        offsetY: 600,
        filter: 'invert(85%) opacity(.80)',
      },
    },
    {
      type: 'text',
      x: 200, //200
      y: 150, //350
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
      type: 'text',
      x: 200, //200
      y: 755, //755
      text: `${getBook(bookId)} ${chapter}:${verse}`,
      props: {
        fillStyle: 'black',
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
      type: 'rectangle',
      x: 0,
      y: 0,
      width: 1280,
      height: 1280,
      props: {
        fillColor: 'black',
        strokeColor: 'black',
        strokeWidth: 1,
      },
    },
    {
      type: 'background',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      props: {
        zoom: 1,
        offsetX: -320,
        offsetY: 0,
        filter: 'contrast(104%) brightness(104%) opacity(.4)',
      },
    },
    {
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
      type: 'text',
      x: 200, //200
      y: 755, //755
      text: `${getBook(bookId)} ${chapter}:${verse}`,
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
              <MenuItem value="Acme">Acme</MenuItem>
              <MenuItem value="Calibri">Calibri</MenuItem>
              <MenuItem value="Crafty Girls">Crafty Girls</MenuItem>
              <MenuItem value="Lekton">Lekton</MenuItem>
              <MenuItem value="Loved by the King">Loved by the King</MenuItem>
              <MenuItem value="Luckiest Guy">Luckiest Guy</MenuItem>
              <MenuItem value="Pattaya">Pattaya</MenuItem>
              <MenuItem value="Roboto">Roboto</MenuItem>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default BibleVerseDisplay;
