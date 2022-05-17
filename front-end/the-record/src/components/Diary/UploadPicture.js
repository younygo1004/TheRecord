import React, { useState, useRef } from 'react';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import '../../styles/diary/makediary.css';

function UploadPicture({ sendPhoto }) {
  const [photo, setPhoto] = useState('');

  const imageInput = useRef();

  const clickUpload = () => {
    imageInput.current.click();
  };

  const upLoadFile = event => {
    if (event.target.files[0]) {
      event.preventDefault();
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = e => {
        setPhoto(e.target.result);
        // 미리 보기 끝
        const data = window.atob(e.target.result.split(',')[1]);
        const array = [];
        for (let i = 0; i < data.length; i += 1) {
          array.push(data.charCodeAt(i));
        }
        const file = new File([new Uint8Array(array)], { type: 'image/png' });
        const formdata = new FormData();
        formdata.append('file', file);
        // sendPhoto(formdata);
        // 임시설정
        console.log(sendPhoto);
      };
    }
  };

  return (
    <div className="upload-picture">
      {photo ? (
        <button
          type="button"
          onClick={() => clickUpload()}
          className="upload-picture-img-btn"
        >
          <img src={photo} alt="사진 업로드" className="upload-picture-img" />
        </button>
      ) : (
        <button
          type="button"
          className="upload-picture-box"
          onClick={() => clickUpload()}
        >
          <PhotoLibraryOutlinedIcon />
        </button>
      )}
      <input
        type="file"
        accpet="img/*"
        onChange={e => upLoadFile(e)}
        style={{ display: 'none' }}
        ref={imageInput}
      />
      <textarea className="record-text" />
    </div>
  );
}

export default UploadPicture;
