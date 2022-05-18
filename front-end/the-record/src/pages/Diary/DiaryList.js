import React from 'react'
import '../../styles/diary/diarymain.css'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import { useHistory } from 'react-router-dom'
import DiaryFolder from './DiaryFolder'

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
  ]

  const history = useHistory()

  const movePhotoDetail = listitem => {
    console.log('이동')
    history.push({
      pathname: '/diary/diarydetail',
      state: {
        DiaryInfo: listitem,
      },
    })
  }
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
    </div>
  )
}

export default DiaryList
