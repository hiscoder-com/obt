export const updateVer1_3_0 = (appConfig) => {
  resetAppConfig(appConfig);
};

const resetAppConfig = (appConfig) => {
  const _appConfig = JSON.parse(localStorage.getItem(appConfig));
  // console.log(_appConfig);
  const keysAppConfig = _appConfig && Object.values(_appConfig);
  if (keysAppConfig) {
    // console.log('keysAppConfig', keysAppConfig);
    let counter = 0;
    keysAppConfig.forEach((el) => {
      if (!Object.keys(el).includes('lg')) {
        console.log('в этом элементе нет ключей lg', el, 'значит обнуляю appConfig');
        counter++;
        return localStorage.removeItem('appConfig');
      }
    });
    if (counter < 1) {
      console.log('version > 1.2.1');
    }

    // const hasBreakpoint = keysAppConfig.filter((el) => {
    //   return Object.keys(el).includes('lg');
    // });
    // if (hasBreakpoint.length < 1) {
    //   localStorage.removeItem('appConfig');
    // } else {
    //   // console.log('version > 1.2.1');
    // }
  }
};
// const updateVer1_3_1RemoveUEB = (appConfig) => {};
