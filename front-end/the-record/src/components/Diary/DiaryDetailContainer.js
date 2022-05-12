import React from 'react';
import '../../styles/diary/diarydetail.css';

function DiaryDetailContainer(props) {
  const { diaryInfo } = props;
  // 로그인 유저 받아오기!
  const loginUser = '5_waterglass';
  const homePageHost = sessionStorage.getItem('homePageHost');
  // 미디어 파일 가져오기
  // const [media, setMedia] = usestate('../../assets/my_profile_photo.png');
  // useEffect(() => {
  //   const reader = new FileReader();

  //   reader.readAsDataURL(diaryInfo.mediaUrl);
  //   reader.onloadend = () => {
  //     setMedia(reader.result);
  //   };
  // }, []);

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
      <hr />
      <div className="diaryinfo-category">{diaryInfo.category}</div>
      <div className="diaryinfo-content">
        <div className="diaryinfo-media">
          <img
            // src={`data:image/png;base64,${image}`}
            src={require('../../assets/my_profile_photo.png')}
            alt="일기 내용"
            className="profile-img"
          />
        </div>
        <div className="diaryinfo-text">
          {diaryInfo.content.split('\n').map(line => {
            return (
              <span key={line}>
                {line}
                <br />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DiaryDetailContainer;
