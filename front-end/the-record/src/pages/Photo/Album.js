import React from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Navigation from '../../components/Navigation';
import EnterBoothButton from './EnterBoothButton';
import MakeBoothButton from './MakeBoothButton';
import PhotoPreview from './PhotoPreview';
import PhotoList from './PhotoList';
import '../../styles/photo/album.css';

function Album() {
  return (
    <div id="album">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="album-btns">
          <button type="button" className="album-btn">
            <CloudUploadOutlinedIcon className="album-btn-icon" />
            업로드 하기
          </button>
          <MakeBoothButton />
          <EnterBoothButton />
        </div>
        <PhotoPreview />
        <Navigation />
      </div>
    </div>
  );
}

export default Album;
