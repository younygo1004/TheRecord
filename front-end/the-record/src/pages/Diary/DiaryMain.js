import React from 'react';
import Navigation from '../../components/Navigation';
import DiaryList from '../../components/Diary/DiaryList';
import Calender from '../../components/Diary/Calendar';
import DiaryDetailContainer from '../../components/Diary/DiaryDetailContainer';
import '../../styles/diary/diarymain.css';

function DiaryMain() {
  // 로그인 유저 받아오기!
  const loginUser = '5_waterglass';
  const homePageHost = sessionStorage.getItem('homePageHost');

  // 전체 다이어리 목록 조회 api 연결
  // const [diarys, setDiarys] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('url{folder}', {
  //       headers: {
  //         "x-auth-token": sessiontStorage.getItem("jwt"),
  //       },
  //     })
  //     .then((res) => {
  //         setDiarys(res.data);
  //     });
  // }, []);

  const diarys = [
    {
      diaryId: 1,
      category: '전체공개',
      mediaUrl: '',
      content:
        '성태가 돈을 모아오라고했다. 싸피에서 받은 돈은 이미 성태한테 다 바쳤는데...',
      title: '백만원씩 모아와',
      recordDt: '2022.05.02',
      visible: 'true',
    },
    {
      diaryId: 2,
      category: '전체공개',
      mediaUrl: '',
      content:
        '성태가 돈을 모아오라고했다. 싸피에서 받은 돈은 이미 성태한테 다 바쳤는데...',
      title: '이백만원씩 모아와',
      recordDt: '2022.05.05',
      visible: 'true',
    },
    {
      diaryId: 3,
      category: '전체공개',
      mediaUrl: '',
      content:
        '성태가 돈을 모아오라고했다. 싸피에서 받은 돈은 이미 성태한테 다 바쳤는데...',
      title: '삼백만원씩 모아와',
      recordDt: '2022.05.07',
      visible: 'true',
    },
  ];

  return (
    <div id="diarymain">
      <div className="bg-white-left">
        <div className="diary-diarylist">
          <DiaryList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="diarymain-box">
          <div className="diarymain-header">
            <p className="diarymain-header-title">전체 일기</p>
            {loginUser === homePageHost ? (
              <button type="button" className="make-diary-btn">
                일기 작성하기
              </button>
            ) : (
              ''
            )}
          </div>
          <Calender />
          <div className="diarymain-content">
            {diarys.map(diary => (
              <div key={diary.diaryId} className="diarymain-item-content">
                <DiaryDetailContainer diaryInfo={diary} />
              </div>
            ))}
          </div>
        </div>
        <Navigation />
      </div>
    </div>
  );
}

export default DiaryMain;
