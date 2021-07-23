function Matrix(height, width) {
  this.matrix = Array(height)
    .fill(0)
    .map(() => Array(width).fill(0));
  this.console = () => {
    console.log(this.matrix.map((el) => JSON.stringify(el)).join('\n'));
  };
  this.fillRect = (x, y, h, w) => {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        this.matrix[y + j][x + i] = 1;
      }
    }
  };
  this.getXY = () => {
    const position = { x: 0, y: 0 };
    const max = { y: this.matrix[0].length - 1, x: this.matrix.length - 1 };
    let find = false;
    for (let x = 0; x < max.x; x++) {
      const line = this.matrix[x];
      for (let y = 0; y < max.y; y++) {
        const val = line[y];
        if (val === 1) {
          find = false;
        } else {
          position.x = x;
          position.y = y;
          find = true;
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              if (position.x + i > max.x || position.y + j > max.y) {
                find = false;
                break;
              } else {
                if (this.matrix[position.x + i][position.y + j] === 1) {
                  find = false;
                  break;
                }
              }
            }
            if (!find) {
              break;
            }
          }
          if (find) {
            return position;
          }
        }
      }
    }
  };
}

/** функция для рассчета высоты матрицы. Ищет самую низкую карточку */
const calculateHeight = (appConfig) => {
  let maxHeight = 0;
  if (appConfig.length > 0) {
    appConfig.forEach((el) => {
      maxHeight = Math.max(maxHeight, el.h + el.y);
    });
  }
  return maxHeight;
};

/** функция заполняе тпустую матрицу 1 там, где у нас карточки есть */
const fillMatrix = (matrix, appConfig) => {
  if (appConfig.length > 0) {
    appConfig.forEach((el) => {
      matrix.fillRect(el.x, el.y, el.h, el.w);
    });
  }
  return matrix;
};

/** функция для получения заполненной карточки */
const getFilledMatrix = (appConfig) => {
  const matrix = new Matrix(calculateHeight(appConfig) + 4, 12);
  fillMatrix(matrix, appConfig);
  return matrix;
};

export const getXY = (appConfig) => {
  const matrix = getFilledMatrix(appConfig);
  return matrix.getXY();
};
