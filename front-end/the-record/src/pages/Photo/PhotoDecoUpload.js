import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import Navigation from '../../components/Navigation';
import PhotoList from '../../components/Album/PhotoList';
// import PhotoUpload from '../../components/Album/PhotoUpload';
import '../../styles/photo/album.css';

function PhotoDecoUpload() {
  const { state } = useLocation();
  const [form, setForm] = useState({
    title: '',
    visible: 'PUBLIC',
  });

  const onChangTitle = e => {
    setForm({ ...form, [e.target.title]: e.target.value });
  };

  const saveDecoPhoto = () => {
    // base64 -> 파일화
    const blobBin = atob(state.split(',')[1]); // base64 데이터 디코딩
    const array = [];
    for (let i = 0; i < blobBin.length; i += 1) {
      array.push(blobBin.charCodeAt(i));
    }
    const myBlob = new Blob([new Uint8Array(array)], { type: 'image/png' }); // Blob 생성
    const file = new File([myBlob], 'blobtofile.png');
    const formData = new FormData(); // formData 생성
    formData.append('media', file);
    console.log(formData);
    // eslint-disable-next-line no-restricted-syntax
    for (const value of formData.values()) {
      console.log(value);
    }

    axios({
      method: 'post',
      url: 'https://the-record.co.kr:8080/api/phoffto',
      data: {
        formData,
        form,
      },
      headers: {
        'x-auth-token': sessionStorage.getItem('jwt'),
      },
    })
      .then(res => {
        console.log(res);
      })
      .catch(res => {
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
          placeholder="제목을 입력해주세요"
          id="title"
          name="title"
          onChange={onChangTitle}
        />
        <img alt="DecoImg" src={state} />
        <button type="button" onClick={saveDecoPhoto}>
          사진첩에 저장하기
        </button>
        {/* <PhotoUpload /> */}
        <Navigation />
      </div>
    </div>
  );
}

export default PhotoDecoUpload;
