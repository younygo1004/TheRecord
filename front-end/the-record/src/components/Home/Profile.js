import React from 'react';
import myProfilePhoto from '../../assets/my_profile_photo.png';
import otherProfilePhoto from '../../assets/other_profile_photo.png';
import NeighborButton from './NeighborButton';

function Profile() {
  // 현재 로그인 상태 세션에 올려놓음(userInfo)
  const loginUser = '5_waterglass';
  const loginUserProfileText =
    '다가가볼까...?\n말건네볼까...?\n이런 생각을 dddddddddddddddddddddddddddddddddddddddd하면서 망설였습니다.\n그리고, 결심하고 뒤를 돌아보자\n그리고, 결심하고 뒤를 돌아보자\n그리고, 결심하고 뒤를 돌아보자\n그리고, 결심하고 뒤를 돌아보자\n그리고, 결심하고 뒤를 돌아보자\n그리고, 결심하고 뒤를 돌아보자\n그리고, 결심하고 뒤를 돌아보자\n그리고, 결심하고 뒤를 돌아보자\n그사람은 이미 떠나고 없었습니다.';

  // 현재 보고있는 홈피 주인 정보
  const homePageHost = sessionStorage.getItem('homePageHost');
  const otherProfileText =
    '난... ㄱㅏ끔...\n눈물을 흘린ㄷㅏ....\nㄱㅏ끔은 눈물을 참을 수 없는\nㄴㅐ가 별루ㄷㅏ...\n';

  const handleEnter = sentence => {
    const newSentence = sentence.split('\n').map((line, index) => {
      return (
        <p key={(line, index)}>
          {line}
          <br />
        </p>
      );
    });
    return newSentence;
  };

  const handleHostProfile = () => {
    // 다른사람 홈페이지 방문
    if (loginUser !== homePageHost) {
      return (
        <div className="profile-info">
          <img src={otherProfilePhoto} alt="일촌 홈피" />
          <div className="profile-text">{handleEnter(otherProfileText)}</div>
        </div>
      );
    }

    // 내 홈페이지 (userInfo 내의 Profile 정보)
    return (
      <div className="profile-info">
        <img src={myProfilePhoto} alt="내 홈피" />
        <div className="profile-text">{handleEnter(loginUserProfileText)}</div>
      </div>
    );
  };

  const handleNeighborButton = () => {
    if (loginUser !== homePageHost) {
      return (
        <button type="button" className="ilchon-button">
          일촌 맺기
        </button>
      );
    }
    return <NeighborButton />;
  };

  return (
    <div id="profile">
      {handleHostProfile()}
      {handleNeighborButton()}
    </div>
  );
}

export default Profile;
