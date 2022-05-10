import React from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import '../../styles/home/home-header.css';
import store from '../../store';
import { ADD_NAVPAGE } from '../../actions/navigation';

function HomeHeader() {
  const navigate = useNavigate();
  // 현재 로그인 상태 세션에 올려놓음(userInfo)
  const loginUser = '5_waterglass';

  // 현재 보고있는 홈피 주인 이름
  // 원래는 유저 친구목록 -> userPK로 요청해서 정보를 얻어올 것임 -> persist-state에 올리기
  const homePageHost = sessionStorage.getItem('homePageHost');

  const userName = () => {
    if (loginUser !== homePageHost) {
      return homePageHost;
    }
    return loginUser;
  };

  const moveMyPage = () => {
    sessionStorage.setItem('homePageHost', loginUser);
    store.dispatch({ type: ADD_NAVPAGE, data: 'nav-home' });
    navigate('/home');
  };

  const headerProfileButton = () => {
    if (loginUser !== homePageHost) {
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

    const logOut = () => {
      navigate('');
      sessionStorage.clear();
    };

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
      <p className="header-left">{userName()} 님의 미니홈피</p>
      <div>{headerProfileButton()}</div>
    </div>
  );
}

export default HomeHeader;
