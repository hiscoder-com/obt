export const updateVer1_3_1 = (appConfig) => {
  updateVer1_3_1ResetAppConfig(appConfig);
};

const updateVer1_3_1ResetAppConfig = (appConfig) => {
  const _appConfig = JSON.parse(localStorage.getItem(appConfig));
  const keysAppConfig = _appConfig && Object.values(_appConfig);
  if (keysAppConfig) {
    console.log('keysAppConfig', keysAppConfig);
    const hasBreakpoint = keysAppConfig.filter((el) => {
      return Object.keys(el).includes('lg');
    });
    if (hasBreakpoint.length < 1) {
      localStorage.removeItem('appConfig');
    } else {
      console.log('version > 1.2.1');
    }
  }
};
// const updateVer1_3_1RemoveUEB = (appConfig) => {};
