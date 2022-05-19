import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import Navigation from '../../components/Navigation'
import '../../styles/diary/makediary.css'
import DiaryList from '../../components/Diary/DiaryList'
import MakeDiaryButton from '../../components/Diary/MakeDiaryButton'
import MakeDiaryHeader from '../../components/Diary/MakeDiaryHeader'
import RecordVideo from '../../components/Diary/RecordVideo'
import RecordVoice from '../../components/Diary/RecordVoice'
import UploadPicture from '../../components/Diary/UploadPicture'

function MakeDiary() {
  const category = useLocation().state
  const navigate = useNavigate()
  const [diaryDto, setDiaryDto] = useState({
    folderId: '',
    // eslint-disable-next-line
    category: category,
    content: '',
    title: '',
    visible: 'PRIVATE',
  })
  const [form, setForm] = useState()
  const info = {
    title: '',
    folder: '',
    visible: false,
  }

  const setDto = ({ item, value }) => {
    const newDto = {
      ...diaryDto,
      [item]: value,
    }
    setDiaryDto(newDto)
  }

  const checkCategory = () => {
    if (category === 'VIDEO') {
      return (
        <RecordVideo
          sendVideo={e => [setForm(e)]}
          sendText={e => setDto({ item: 'content', value: e })}
        />
      )
    }
    if (category === 'PICTURE') {
      return (
        <UploadPicture
          sendPhoto={e => [setForm(e)]}
          sendText={e => setDto({ item: 'content', value: e })}
        />
      )
    }
    return (
      <RecordVoice
        sendVoice={e => [setForm(e)]}
        sendText={e => setDto({ item: 'content', value: e })}
      />
    )
  }

  const uploadDiary = () => {
    console.log('일기 저장')
    console.log(diaryDto)
    console.log(form)
    if (form && diaryDto.folderId && diaryDto.folderId) {
      form.append(
        'diaryDto',
        new Blob([JSON.stringify(diaryDto)], { type: 'application/json' }),
      )
      console.log(diaryDto)
      // 일기 저장 api 연결
      axios({
        method: 'POST',
        url: 'https://the-record.co.kr:8080/api/diary',
        data: form,
        headers: {
          'x-auth-token': sessionStorage.getItem('jwt'),
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          if (res.data === 'success') {
            console.log('성공')
            navigate('/diary')
          }
        })
        .catch(err => {
          console.log(err)
          alert('일기 내용을 입력하세요')
        })
    } else {
      alert('일기 내용을 입력하세요')
    }
  }

  const cancelUpload = () => {
    setDiaryDto({
      folderId: '',
      category: '',
      content: '',
      title: '',
      visible: 'PRIVATE',
    })
    setForm()
  }

  return (
    <div id="make-diary">
      <div className="bg-white-left">
        <div className="diary-diarylist">
          <DiaryList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="make-diary-container">
          <div className="make-diary-box">
            <MakeDiaryHeader
              info={info}
              sendTitle={e => setDto({ item: 'title', value: e })}
              sendFolder={e => setDto({ item: 'folderId', value: e })}
              sendVisible={e =>
                setDto({
                  item: 'visible',
                  value: e === false ? 'PUBLIC' : 'PRIVATE',
                })
              }
            />
            {checkCategory()}
          </div>
          <MakeDiaryButton
            clickUpload={uploadDiary}
            clickCancel={cancelUpload}
          />
        </div>
        <Navigation />
      </div>
    </div>
  )
}

export default MakeDiary
