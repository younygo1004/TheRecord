import React from 'react';
import Navigation from '../../components/Navigation';
import UploadButton from '../../components/Album/UploadButton';
import EnterBoothButton from '../../components/Album/EnterBoothButton';
import MakeBoothButton from '../../components/Album/MakeBoothButton';
import PhotoPreview from '../../components/Album/PhotoPreview';
import PhotoList from '../../components/Album/PhotoList';
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
          {/* <button type="button" className="album-btn">
            <CloudUploadOutlinedIcon
              className="album-btn-icon"
              fontSize="small"
            />
            업로드 하기
          </button> */}
          <UploadButton />
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
