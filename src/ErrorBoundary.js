import React from 'react';

import { withTranslation } from 'react-i18next';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    // logErrorToMyService(error, errorInfo);
  }
  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <>
          <div
            style={{
              margin: '25px',
              padding: '20px',
              border: '1px dashed #333',
              backgroundColor: 'white',
            }}
          >
            <h1>{t('Oops')}</h1>
            <p>{t('Refresh')}</p>
            <p dangerouslySetInnerHTML={{ __html: t('Reset_button') }} />
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload(false);
              }}
            >
              {t('Reset')}
            </button>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
