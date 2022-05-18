import React, { useCallback, useEffect, useState } from 'react';

function Projector({ Layout }) {
  const [fontSize, setFontSize] = useState(
    localStorage.getItem('projectorFontSize') ?? 100
  );

  const [content, setContent] = useState('');

  const changed = useCallback((e) => {
    switch (e.key) {
      case 'projectorFontSize':
        setFontSize(parseInt(e.newValue));
        break;

      case 'content':
        setContent(JSON.parse(e.newValue));
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', changed, false);
    return () => window.removeEventListener('storage', changed);
  }, [changed]);

  return <Layout fontSize={fontSize} content={content} />;
}

export default Projector;
