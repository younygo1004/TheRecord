import React from 'react';
import '../../styles/photo/album.css';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

function MakeBoothButton() {
  return (
    <div>
      <button type="button" className="album-btn">
        <CameraAltOutlinedIcon className="album-btn-icon" />
        포토부스 생성하기
      </button>
    </div>
  );
}

export default MakeBoothButton;
