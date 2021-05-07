import React from 'react';
import logo from './friends.png';

function LogoFriends({ size, className }) {
  return (
    <div>
      <img alt=" value" src={logo} height={size} className={className} />
    </div>
  );
}
export default LogoFriends;
