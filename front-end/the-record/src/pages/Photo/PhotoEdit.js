import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Navigation from '../../components/Navigation';
import PhotoList from '../../components/Album/PhotoList';
// import PhotoUpload from '../../components/Album/PhotoUpload';
import '../../styles/photo/album.css';

function PhotoEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [photoDto, setPhotoDto] = useState({
    title: state.photoDetail.title,
    visible: state.photoDetail.visible,
  });

  const [checked, setChecked] = useState();

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
  }));

  // 접근 권한
  const handleChange = event => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    // 접근 권한이 바뀔 때
    if (state.photoDetail.visible === 'PUBLIC') setChecked(true);
    else setChecked(false);
  }, [state.photoDetail.visible]);

  useEffect(() => {
    // 토글이 바뀔 때
    if (checked) {
      setPhotoDto(prev => ({ ...prev, visible: 'PUBLIC' }));
    } else {
      setPhotoDto(prev => ({ ...prev, visible: 'PRIVATE' }));
    }
  }, [checked]);

  // 제목 변경
  const onChangTitle = e => {
    setPhotoDto(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // 사진첩 저장
  const saveModifyPhoto = () => {
    axios({
      method: 'put',
      url: 'https://the-record.co.kr:8080/api/photo',
      data: {
        photoId: state.photoDetail.photoId,
        title: photoDto.title,
        visible: photoDto.visible,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('jwt'),
      },
    })
      .then(res => {
        console.log(res);
        navigate('/album');
      })
      .catch(res => {
        alert('문제가 발생했습니다.');
        console.log(res);
      });
  };

  return (
    <div id="album">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <input
          placeholder={photoDto.title}
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
        <img
          alt="DecoImg"
          src={`https://s3.ap-northeast-2.amazonaws.com/the-record.bucket/${state.photoDetail.mediaUrl}`}
        />
        <button type="button" onClick={saveModifyPhoto}>
          사진첩에 저장하기
        </button>
        {/* <PhotoUpload /> */}
        <Navigation />
      </div>
    </div>
  );
}

export default PhotoEdit;
