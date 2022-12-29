import { withRouter } from 'react-router-dom';

function GoogleAnalytics({ location, history }) {
  const gtag = window.gtag;

  if (history.action === 'PUSH' && typeof gtag === 'function') {
    gtag('config', 'UA-87269926-3', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname,
    });
  }
  return null;
}

export default withRouter(GoogleAnalytics);
