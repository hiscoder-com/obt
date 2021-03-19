import React from 'react';
import logo from './logo.png';

function Logo({ size, className }) {
  return (
    <div>
      <img alt=" value" src={logo} height={size} className={className} />
    </div>
  );
}

export default Logo;
