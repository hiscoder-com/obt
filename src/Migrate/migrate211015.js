export const migrate211015 = () => {
  fixUEB();
};

const fixUEB = () => {
  const appConfig = localStorage.getItem('appConfig');
  if (appConfig !== null) {
    const bible = JSON.parse(appConfig).bible;
    if (Array.isArray(bible)) {
      bible.map((el) => {
        if (el.i === 'en_ueb') {
          el.i = 'en_ult';
        }
        return el;
      });
      localStorage.setItem(
        'appConfig',
        JSON.stringify({ obs: JSON.parse(appConfig).obs, bible })
      );
    }
  }
};
