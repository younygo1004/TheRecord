import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common/navigation.css';

function Navigation() {
  return (
    <div id="navigation">
      <Link to="/home" id="nav-home">
        홈
      </Link>
      <Link to="/diary" id="nav-diary">
        다이어리
      </Link>
      <Link to="/album" id="nav-album">
        사진첩
      </Link>
    </div>
  );
}

export default Navigation;
