export const updateVer1_3_1 = (appConfig) => {
  const _appconfig = JSON.parse(localStorage.getItem(appConfig));
  const keysAppConfig = _appconfig && Object.values(_appconfig);
  console.log('keysAppConfig', keysAppConfig);
};

// export const updateAppConfig = (appConfig) => {
//   const _appconfig = JSON.parse(localStorage.getItem(appConfig));
//   const keysAppConfig = _appconfig && Object.values(_appconfig);
//   let _keysAppConfig = [];
//   if (keysAppConfig) {
//     keysAppConfig.forEach((el) => _keysAppConfig.push(...Object.keys(el)));
//     let setKeysAppConfig = new Set(_keysAppConfig);
//     if (
//       ![...setKeysAppConfig].forEach((el) => ['lg', 'md', 'sm', 'xs', 'xxs'].includes(el))
//     ) {
//       console.log('No breakpoints!!');
//       localStorage.removeItem(appConfig);
//     }
//   }
// };
