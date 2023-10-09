export const template1 = [
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
    param: 'verse',
    type: 'text',
    x: 200,
    y: 260,
    // text: text,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    type: 'text',
    x: 200,
    y: 1130,
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];
export const template2 = [
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
    param: 'verse',
    type: 'text',
    x: 200,
    y: 350,
    // text: text,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    type: 'text',
    x: 200,
    y: 950,
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];

export const template3 = [
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
    param: 'verse',
    type: 'text',
    x: 200,
    y: 260,
    // text: text,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    type: 'text',
    x: 200,
    y: 1160,
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];
export const template4 = [
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
    param: 'verse',
    type: 'text',
    x: 200, //200
    y: 350, //350
    // text: text,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    type: 'text',
    x: 200, //200
    y: 755, //755
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];

export const template5 = [
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
    param: 'verse',
    type: 'text',
    x: 200,
    y: 480,
    // text: text,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    type: 'text',
    x: 200,
    y: 1100,
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];
export const template6 = [
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
    param: 'verse',
    type: 'text',
    x: 250, //200
    y: 350, //350
    // text: text,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'left',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    type: 'text',
    x: 730, //200
    y: 755, //755
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'left',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];

export const template7 = [
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
      // filter: 'contrast(0%)',
    },
  },
  {
    type: 'image',
    url: 'https://img.icons8.com/?size=80&id=3WbxGrgDDLw0&format=png',
    props: {
      zoom: 1,
      offsetX: 130,
      offsetY: 530,
      // filter: 'contrast(100%)',
    },
  },
  {
    type: 'text',
    x: 200, //200
    y: 350, //350
    // text: text,
    props: {
      fillStyle: 'black',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    type: 'text',
    x: 200, //200
    y: 855, //755
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fillStyle: 'black',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];

export const template8 = [
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
    // text: text,
    props: {
      fillStyle: '#75340D',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    type: 'text',
    x: 200, //200
    y: 755, //755
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fillStyle: '#75340D',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];

export const template9 = [
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
    // text: text,
    props: {
      fillStyle: 'white',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    type: 'text',
    x: 200, //200
    y: 755, //755
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fillStyle: 'black',
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];

export const template10 = [
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
    param: 'verse',
    type: 'text',
    x: 200, //200
    y: 350, //350
    // text: text,
    props: {
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },

  {
    param: 'ref',
    type: 'text',
    x: 200, //200
    y: 755, //755
    // text: `${bookId} ${chapter}:${verse}`,
    props: {
      fontStyle: '800',
      fontSize: 95,
      font: 'Alumni Sans',
      alignment: 'center',
      blockWidth: 900,
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
];
