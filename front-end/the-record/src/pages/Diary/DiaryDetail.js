import React from 'react';
import { useLocation } from 'react-router';
import Navigation from '../../components/Navigation';
import DiaryList from '../../components/Diary/DiaryList';
import DiaryDetailContainer from '../../components/Diary/DiaryDetailContainer';
import '../../styles/diary/diarydetail.css';

function DiaryDetail() {
  // 로그인 유저 받아오기!
  const loginUser = '5_waterglass';
  const homePageHost = sessionStorage.getItem('homePageHost');

  // 일기 상세 정보 조회 api 연결
  const diaryId = useLocation().state;
  // const [diaryInfo, setDiaryInfo] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('url{diaryId}', {
  //       headers: {
  //         "x-auth-token": sessiontStorage.getItem("jwt"),
  //       },
  //     })
  //     .then((res) => {
  //         setDiaryInfo(res.data);
  //     });
  // }, []);
  const diaryInfo = {
    diaryId: 1,
    category: '전체공개',
    mediaUrl: '',
    content:
      '성태가 돈을 모아오라고했다. 싸피에서 받은 돈은 이미 성태한테 다 바쳤는데...',
    title: '백만원씩 모아와',
    recordDt: '2022.05.02',
    visible: 'true',
  };

  return (
    <div id="diarydetail">
      <div className="bg-white-left">
        <div className="diary-diarylist">
          <DiaryList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="diarydetail-box">
          <div className="diarydetail-header">
            {loginUser === homePageHost ? (
              <button type="button" className="make-diary-btn">
                일기 작성하기
              </button>
            ) : (
              ''
            )}
          </div>
          <DiaryDetailContainer diaryInfo={diaryInfo} />
          {diaryId}
        </div>

        <Navigation />
      </div>
    </div>
  );
}

export default DiaryDetail;
