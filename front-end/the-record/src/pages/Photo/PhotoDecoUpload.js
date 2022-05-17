import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Navigation from '../../components/Navigation'
import PhotoList from '../../components/Album/PhotoList'
// import PhotoUpload from '../../components/Album/PhotoUpload';
import '../../styles/photo/album.css'

function PhotoDecoUpload() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [photoDto, setPhotoDto] = useState({
    title: '',
    visible: 'PUBLIC',
  })
  const [checked, setChecked] = useState(true)

  // 토글
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    // display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? '#177ddc'
              : 'rgba(29, 142, 174, 0.87)',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,.35)'
          : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }))

  // 접근 권한
  const handleChange = event => {
    setChecked(event.target.checked)
  }

  useEffect(() => {
    // 토글이 바뀔 때
    if (checked) {
      setPhotoDto(prev => ({ ...prev, visible: 'PUBLIC' }))
    } else {
      setPhotoDto(prev => ({ ...prev, visible: 'PRIVATE' }))
    }
  }, [checked])

  useEffect(() => {
    // 접근 권한이 바뀔 때
    if (photoDto.visible === 'PUBLIC') {
      console.log(photoDto)
      console.log('트루')
    } else {
      setPhotoDto(prev => ({ ...prev, visible: 'PRIVATE' }))
      console.log(photoDto)
      console.log('페일')
    }
  }, [photoDto.visible])

  // 제목 변경
  const onChangTitle = e => {
    setPhotoDto(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  useEffect(() => {
    console.log(photoDto)
  }, [photoDto.title])

  // 사진첩 저장
  const saveDecoPhoto = () => {
    // base64 -> 파일화
    const blobBin = atob(state.split(',')[1]) // base64 데이터 디코딩
    const array = []
    for (let i = 0; i < blobBin.length; i += 1) {
      array.push(blobBin.charCodeAt(i))
    }

    const file = new File([new Uint8Array(array)], 'blobtofile.png', {
      type: 'image/png',
    })

    const formData = new FormData() // formData 생성
    formData.append('file', file)
    // 'key'라는 이름으로 위에서 담은 data를 formData에 append한다. type은 json
    formData.append(
      'photoDto',
      new Blob([JSON.stringify(photoDto)], { type: 'application/json' }),
    )

    console.log(file)
    console.log(photoDto)
    // console.log(...formData.getHeaders());
    console.log(sessionStorage.getItem('jwt'))
    // formData 확인
    // eslint-disable-next-line no-restricted-syntax
    for (const key of formData.keys()) {
      console.log(key)
    }

    axios({
      method: 'post',
      url: 'https://the-record.co.kr:8080/api/photo',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': sessionStorage.getItem('jwt'),
      },
    })
      .then(res => {
        console.log(res)
        navigate('/album')
      })
      .catch(res => {
        alert('문제가 발생했습니다.')
        console.log(res)
      })
  }

  return (
    <div id="album">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <input
          placeholder="제목을 입력해주세요"
          id="title"
          onChange={onChangTitle}
        />
        <div>
          <p>나만 보기</p>
          <AntSwitch
            checked={checked}
            onChange={event => handleChange(event)}
            inputProps={{ 'aria-label': 'ant design' }}
          />
        </div>
        <img alt="DecoImg" src={state} />
        <button type="button" onClick={saveDecoPhoto}>
          사진첩에 저장하기
        </button>
        {/* <PhotoUpload /> */}
        <Navigation />
      </div>
    </div>
  )
}

export default PhotoDecoUpload
