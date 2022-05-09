import React from 'react';
import '../../styles/diary/diarydetail.css';

function DiaryDetailContainer(props) {
  const { diaryInfo } = props;
  // 로그인 유저 받아오기!
  const loginUser = '5_waterglass';
  const homePageHost = sessionStorage.getItem('homePageHost');

  return (
    <div className="diarydetail-container">
      <div className="diaryinfo-header">
        <div>
          <div className="diaryinfo-header-title">{diaryInfo.title}</div>
          <div className="diaryinfo-header-date">{diaryInfo.recordDt}</div>
        </div>
        {loginUser === homePageHost ? (
          <div>
            <button className="diaryinfo-header-btn" type="button">
              수정
            </button>
            <span style={{ color: '#848484' }}>|</span>
            <button className="diaryinfo-header-btn" type="button">
              삭제
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
      <hr className="diaryinfo-line" />
      <div className="diaryinfo-content">{diaryInfo.content}</div>
    </div>
  );
}

export default DiaryDetailContainer;
