import React from 'react'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import { useNavigate } from 'react-router-dom'

function DiaryItem({ folder }) {
  const navigate = useNavigate()
  //  폴더명으로 일기 목록 조회 api 연결
  // const [diaryItems, setDiaryItems] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('url{folder}', {
  //       headers: {
  //         "x-auth-token": sessiontStorage.getItem("jwt"),
  //       },
  //     })
  //     .then((res) => {
  //         setDiaryItems(res.data);
  //     });
  // }, []);

  const diaryItems = [
    {
      diaryId: 1,
      title: '닥터스트레인지 보고온 날~~~~',
      recordDt: '2022.05.09',
      visible: true,
    },
    {
      diaryId: 2,
      title: '한강에서 치맥',
      recordDt: '2022.05.09',
      visible: true,
    },
    {
      diaryId: 3,
      title: '불금에 노는 법',
      recordDt: '2022.05.09',
      visible: true,
    },
  ]

  const moveDiaryDetail = diaryId => {
    navigate('/diary/diarydetail', {
      state: diaryId,
    })
  }

  console.log(folder)

  return (
    <div className="diaryitem-box">
      {diaryItems.map(diaryItem => (
        <div
          key={diaryItem.diaryId}
          role="button"
          tabIndex={0}
          className="diaryitem-text"
          onClick={() => moveDiaryDetail(diaryItem.diaryId)}
          onKeyUp={() => moveDiaryDetail(diaryItem.diaryId)}
        >
          <SubdirectoryArrowRightIcon sx={{ fontSize: 15 }} />
          <div className="diaryitem-title">{diaryItem.title} &nbsp;</div>
        </div>
      ))}
    </div>
  )
}

export default DiaryItem
