import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';
import { ADD_NAVPAGE } from '../actions/navigation';
import '../styles/common/navigation.css';

function Navigation() {
  const switchNav = navPage => {
    store.dispatch({ type: ADD_NAVPAGE, data: navPage });
    console.log(store.getState().navigation.navPage);
  };

  useEffect(() => {
    const nowPage = store.getState().navigation.navPage;
    const navBar = document.querySelector(`#${nowPage}`);
    navBar.style.backgroundColor = 'white';
    navBar.style.color = 'black';
  }, []);

  return (
    <div id="navigation">
      <Link to="/home" id="nav-home" onClick={() => switchNav('nav-home')}>
        홈
      </Link>
      <Link to="/diary" id="nav-diary" onClick={() => switchNav('nav-diary')}>
        다이어리
      </Link>
      <Link to="/album" id="nav-album" onClick={() => switchNav('nav-album')}>
        사진첩
      </Link>
    </div>
  );
}

export default Navigation;
