import React, { useState } from 'react';
import '../../styles/diary/diarymain.css';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DiaryItem from './DiaryItem';

function DiaryList() {
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState(-1);
  // 로그인 유저 받아오기!
  const loginUser = '5_waterglass';
  const homePageHost = sessionStorage.getItem('homePageHost');

  // 일기폴더 조회 api 연결
  // const [diarylist, setDiarylist] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('url', {
  //       headers: {
  //         "x-auth-token": sessiontStorage.getItem("jwt"),
  //       },
  //     })
  //     .then((res) => {
  //         setDiarylist(res.data);
  //     });
  // }, []);

  const list = [
    {
      folderId: 2,
      folderName: '기분 좋은 날',
    },
    {
      folderId: 3,
      folderName: 'CSS 너무 어렵다 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ',
    },
  ];

  const openList = folderId => {
    if (folderId === folder) {
      setOpen(!open);
    } else {
      setFolder(folderId);
      setOpen(true);
    }
  };

  return (
    <div className="diarylist">
      <div className="diarylist-header">
        <p className="diarylist-text">일기목록</p>
        {loginUser === homePageHost ? (
          <button type="button" className="diarylist-folder-btn">
            폴더 수정
          </button>
        ) : (
          ''
        )}
      </div>
      <hr />

      <div className="diarylist-box">
        {list.map(listitem => (
          <div className="diarylist-folder" key={listitem.folderId}>
            <div
              role="button"
              tabIndex={0}
              className="diarylist-item"
              onClick={() => openList(listitem.folderId)}
              onKeyUp={() => openList(listitem)}
            >
              <FolderOpenIcon className="diarylist-icon" />
              <div className="diarylist-title">
                {listitem.folderName} &nbsp;
              </div>
            </div>
            {listitem.folderId === folder && open ? (
              <DiaryItem folder={folder} />
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaryList;
