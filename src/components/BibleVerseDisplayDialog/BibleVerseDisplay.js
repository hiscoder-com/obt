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

import {
  template1,
  template2,
  template3,
  template4,
  template5,
  template6,
  template7,
  template8,
  template9,
  template10,
} from './templates';

const BibleVerseDisplay = () => {
  const [fontSize, setFontSize] = useState(95);
  const [fontStyle, setFontStyle] = useState('800');
  const [fontTheme, setFontTheme] = useState('Alumni Sans');

  const [fillStyle, setFillStyle] = useState('white');
  const [blockWidth, setBlockWidth] = useState(900);
  const [alignment, setAlignment] = useState('center');

  const [letterSpacing, setLetterSpacing] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [selectedTemplateData, setSelectedTemplateData] = useState(template1);

  const [canvasKey, setCanvasKey] = useState(0);

  const {
    state: { referenceBlock },
  } = useContext(ReferenceContext);

  const { bookId, chapter, verse, text } = referenceBlock;

  const updateFontColor = (newFontColor) => {
    // Copy the template data array
    const updatedTemplateData = [...selectedTemplateData];

    // Find the object responsible for font color (assuming it has a parameter 'fillStyle')
    const fontColorIndex = updatedTemplateData.findIndex(
      (element) => element.param === 'verse' // Replace 'verse' with the parameter responsible for font color in your case
    );

    if (fontColorIndex !== -1) {
      // Update the font color value
      updatedTemplateData[fontColorIndex].props.fillStyle = newFontColor;

      // Update selectedTemplateData within the function
      setSelectedTemplateData(updatedTemplateData);
    }
  };

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
    updateFontColor(e.target.value);
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

  const updateTemplateData = (selectedTemplate) => {
    let temp = [];
    let verseObjectIndex = -1;
    switch (selectedTemplate) {
      case 'template1':
        temp = template1;
        verseObjectIndex = temp.findIndex((element) => element.param === 'verse');
        if (verseObjectIndex !== -1) {
          temp[verseObjectIndex].text = text;
        }
        setSelectedTemplateData(temp);
        break;
      case 'template2':
        temp = template2;
        verseObjectIndex = temp.findIndex((element) => element.param === 'verse');
        if (verseObjectIndex !== -1) {
          temp[verseObjectIndex].text = text;
        }
        setSelectedTemplateData(temp);
        console.log(temp, 125);
        break;
      case 'template3':
        setSelectedTemplateData(template3);
        break;
      case 'template4':
        setSelectedTemplateData(template4);
        break;
      case 'template5':
        setSelectedTemplateData(template5);
        break;
      case 'template6':
        setSelectedTemplateData(template6);
        break;
      case 'template7':
        setSelectedTemplateData(template7);
        break;
      case 'template8':
        setSelectedTemplateData(template8);
        break;
      case 'template9':
        setSelectedTemplateData(template9);
        break;
      case 'template10':
        setSelectedTemplateData(template10);
        break;
      default:
        break;
    }
  };

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
                updateTemplateData(e.target.value);
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default BibleVerseDisplay;
