import React, { useState } from 'react'
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
  const [diaryDto, setDiaryDto] = useState({
    folderId: '',
    category: '',
    content: '',
    title: '',
    visible: 'private',
  })
  const [form, setForm] = useState()

  const setInfo = ({ item, value }) => {
    const newDto = {
      ...diaryDto,
      [item]: value,
    }
    setDiaryDto(newDto)
  }

  const checkCategory = () => {
    if (category === 'video') {
      return (
        <RecordVideo
          sendVideo={e => [
            setForm(e),
            setInfo({ item: 'category', value: 'video' }),
          ]}
        />
      )
    }
    if (category === 'picture') {
      return (
        <UploadPicture
          sendPhoto={e => [
            setForm(e),
            setInfo({ item: 'category', value: 'picture' }),
          ]}
        />
      )
    }
    return (
      <RecordVoice
        sendVoice={e => [
          setForm(e),
          setInfo({ item: 'category', value: 'voice' }),
        ]}
      />
    )
  }

  const uploadDiary = () => {
    console.log('일기 저장')
    form.append(
      'diaryDto',
      new Blob([JSON.stringify(diaryDto)], { type: 'application/json' }),
    )
    // eslint-disable-next-line no-restricted-syntax
    for (const key of form.keys()) {
      console.log(key)
    }

    // 일기 저장 api 연결
    // axios({
    //   method: 'POST',
    //   url: 'https://the-record.co.kr:8080/api/diary,
    //   data: form,
    //   headers: {
    //     'x-auth-token': sessionStorage.getItem('jwt'),
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then(res => {
    //     console.log('성공');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
              sendTitle={e => setInfo({ item: 'title', value: e })}
              sendFolder={e => setInfo({ item: 'folderId', value: e })}
              sendVisible={e =>
                setInfo({
                  item: 'visible',
                  value: e === false ? 'public' : 'private',
                })
              }
            />
            {checkCategory()}
          </div>
          <MakeDiaryButton clickUpload={uploadDiary} />
        </div>
        <Navigation />
      </div>
    </div>
  )
}

export default MakeDiary
