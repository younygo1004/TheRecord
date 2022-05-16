import React from 'react';
import '../../styles/diary/diarymain.css';
// import ListSubheader from '@mui/material/ListSubheader';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';

// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';

// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useHistory } from 'react-router-dom';
import DiaryFolder from './DiaryFolder';

function DiaryList() {
  // 일기목록 불러오는 api 연결
  // const [photolist, setPhotolist] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('url', {
  //       headers: {
  //         "x-auth-token": sessiontStorage.getItem("jwt"),
  //       },
  //     })
  //     .then((res) => {
  //         setPhotolist(res.data);
  //     });
  // }, []);

  const list = [
    {
      diaryId: 2,
      title: '기분 좋은 날',
      media_url: '',
      record_dt: '2022.XX.XX',
      visible: '',
    },
    {
      diaryId: 3,
      title: 'CSS 너무 어렵다 ㅠ',
      media_url: '',
      record_dt: '2022.XX.XX',
      visible: '',
    },
  ];

  const history = useHistory();

  const movePhotoDetail = listitem => {
    console.log('이동');
    history.push({
      pathname: '/diary/diarydetail',
      state: {
        DiaryInfo: listitem,
      },
    });
  };
  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };
  return (
    <div className="diarylist">
      <p className="diarylist-text">일기목록</p>
      <hr />

      <div className="diarylist-box">
        <DiaryFolder />
        {list.map(listitem => (
          <div
            key={listitem.diaryId}
            role="button"
            tabIndex={0}
            className="diarylist-item"
            onClick={() => movePhotoDetail(listitem)}
            onKeyUp={() => movePhotoDetail(listitem)}
          >
            <HorizontalRuleIcon className="diarylist-icon" />
            <div className="diarylist-title">{listitem.title} &nbsp;</div>
            <div className="diarylist-title">{listitem.record_dt}</div>
          </div>
        ))}
      </div>
      {/* <List>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText primary="전체일기" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <HorizontalRuleIcon />
              </ListItemIcon>
              <ListItemText primary="닥터스트레인지 스포일러" />
            </ListItemButton>
          </List>
        </Collapse>
      </List> */}
    </div>
  );
}

export default DiaryList;
