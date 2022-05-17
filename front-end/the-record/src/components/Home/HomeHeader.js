import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import '../../styles/home/home-header.css';
import store from '../../store';
import { actions } from '../../actions/common';

function HomeHeader() {
  const navigate = useNavigate();
  const loginUserInfo = useSelector(state => state.common.loginUserInfo);

  // 현재 보고있는 홈피 주인 이름
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo);

  const moveMyPage = () => {
    store.dispatch(actions.setValue('homePageHostInfo', loginUserInfo));
    store.dispatch(actions.setValue('navPage', 'nav-home'));
    navigate('/home');
  };

  const logOut = () => {
    navigate('');
    sessionStorage.clear();
  };

  const headerProfileButton = () => {
    if (loginUserInfo.name !== homePageHostInfo.name) {
      return (
        <button
          className="header-right-button"
          type="button"
          onClick={() => {
            moveMyPage();
          }}
        >
          내 홈피로 돌아가기
        </button>
      );
    }
    return (
      <div className="header-right">
        <div className="header-right-button">
          <EditProfile />
        </div>
        <button
          className="header-right-button"
          type="button"
          onClick={() => logOut()}
        >
          로그아웃
        </button>
      </div>
    );
  };

  return (
    <div id="home-header">
      <p className="header-left">{homePageHostInfo.name} 님의 미니홈피</p>
      <div>{headerProfileButton()}</div>
    </div>
  );
}

export default HomeHeader;
