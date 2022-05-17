import React, { useState } from 'react'

// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { useHistory } from 'react-router-dom'

function DiaryFolder() {
  const [ListOpen, setListOpen] = useState(false)
  const history = useHistory()
  const handleHost = neighbor => {
    console.log(neighbor)
    // neighbor.userPk로 사용자 정보 요청해서 history로 넘겨주기

    sessionStorage.setItem('homePageHost', neighbor.name)
    history.push({
      pathname: '/home',
    })
  }
  // useEffect 로그인한 유저의 일촌 목록 불러오기
  const res = [
    {
      diaryId: 0,
      title: '닥터스트레인지 보고온 날',
    },
    {
      diaryId: 1,
      title: '한강에서 치맥',
    },
    {
      diaryId: 2,
      title: '불금에 노는 법',
    },
  ]

  const neighborList = () => {
    return res.map(neighbor => (
      <div key={neighbor.diaryId}>
        <HorizontalRuleIcon className="diarylistdetail-icon" sx={{ mr: 1 }} />
        <button type="button" onClick={() => [handleHost(neighbor)]}>
          <div className="diarylistdetail-item">{neighbor.title}</div>
        </button>
      </div>
    ))
  }

  return (
    <div>
      <FolderOpenIcon className="diarylist-icon" />
      <button type="button" onClick={() => setListOpen(!ListOpen)}>
        <div className="diarylistdetail-title">전체일기</div>
      </button>
      <div>{ListOpen && neighborList()}</div>
    </div>
  )
}

export default DiaryFolder
