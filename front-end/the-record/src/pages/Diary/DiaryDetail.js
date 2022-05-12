import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Navigation from '../../components/Navigation';
import DiaryList from '../../components/Diary/DiaryList';
import DiaryDetailContainer from '../../components/Diary/DiaryDetailContainer';
import '../../styles/diary/diarydetail.css';

function DiaryDetail() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  //  로그인 유저 받아오기!
  const loginUser = '5_waterglass';
  const homePageHost = sessionStorage.getItem('homePageHost');

  // 일기 상세 정보 조회 api 연결
  // const diaryId = useLocation().state;
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
      '성태가 돈을 모아오라고했다. \n 싸피에서 받은 돈은 이미 성태한테 다 바쳤는데...\n 이미 주형이는 형! 여기있어!를 외치며 761,950원을 뺏겼다고 한다. \n 같은 팀하기 무섭다................왜 안되냐.................................................................................스크롤스크롤스크롤스크롤스크롤스크롤',
    title: '백만원씩 모아와',
    recordDt: '2022.05.02',
    visible: 'true',
  };

  const openSelectDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const moveMakeDiary = category => {
    navigate('/diary/makediary', { state: category });
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
              <button
                type="button"
                className="make-diary-btn"
                onClick={() => {
                  openSelectDialog();
                }}
              >
                일기 작성하기
              </button>
            ) : (
              ''
            )}
          </div>
          <DiaryDetailContainer diaryInfo={diaryInfo} />
        </div>
        <Navigation />
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        id="dialog"
        className="diary-dialog"
        aria-labelledby="dialog-container"
        aria-describedby="dialog-description"
        PaperProps={{
          sx: {
            minWidth: 800,
            borderRadius: 2.7,
          },
        }}
      >
        <DialogTitle id="dialog-container" className="dialog-header">
          <div className="dialog-title">
            <p>카테고리 선택</p>
          </div>
          <Button
            sx={{
              minWidth: 36,
              height: 49,
            }}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseRoundedIcon
              sx={{
                fontSize: 29,
              }}
            />
          </Button>
        </DialogTitle>
        <div className="dialog-body-box">
          <div className="diary-dialog-body">
            <button
              type="button"
              className="diary-dialog-btns"
              onClick={() => {
                moveMakeDiary('picture');
              }}
            >
              <img
                src={require('../../assets/picture.png')}
                alt="uploadPicture"
                className="diary-dialog-img"
              />
              <div>사진 & 글로 남기기</div>
            </button>
            <button
              type="button"
              className="diary-dialog-btns"
              onClick={() => {
                moveMakeDiary('video');
              }}
            >
              <img
                src={require('../../assets/recording.png')}
                alt="uploadPicture"
                className="diary-dialog-img"
              />
              <div>영상으로 남기기</div>
            </button>
            <button
              type="button"
              className="diary-dialog-btns"
              onClick={() => {
                moveMakeDiary('voice');
              }}
            >
              <img
                src={require('../../assets/voice.png')}
                alt="uploadPicture"
                className="diary-dialog-img"
              />
              <div>목소리로 남기기</div>
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DiaryDetail;
