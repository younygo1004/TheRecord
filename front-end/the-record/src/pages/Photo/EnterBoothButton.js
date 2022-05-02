import React from 'react';
import '../../styles/photo/album.css';
import LinkedCameraOutlinedIcon from '@mui/icons-material/LinkedCameraOutlined';

function EnterBoothButton() {
  return (
    <div>
      <button type="button" className="album-btn">
        <LinkedCameraOutlinedIcon className="album-btn-icon" />
        포토부스 입장하기
      </button>
    </div>
  );
}

export default EnterBoothButton;
