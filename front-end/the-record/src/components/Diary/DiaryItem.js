import React, { useState, useEffect } from 'react'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

function DiaryItem({ folder }) {
  const navigate = useNavigate()
  //  폴더명으로 일기 목록 조회 api 연결
  const [diaryItems, setDiaryItems] = useState([])
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)
  useEffect(() => {
    axios
      .get(
        `https://the-record.co.kr/api/diary/${homePageHostInfo.userPk}/folder/${folder}`,
        {
          headers: {
            'x-auth-token': sessionStorage.getItem('jwt'),
          },
        },
      )
      .then(res => {
        setDiaryItems(res.data)
      })
  }, [])

  const moveDiaryDetail = diaryId => {
    console.log(diaryId)
    navigate('/diary/diarydetail', {
      state: diaryId,
    })
  }

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
