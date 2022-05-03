import React from 'react';
import Navigation from '../../components/Navigation';
import '../../styles/photo/photobooth.css';

function PhotoBooth() {
  return (
    <div id="photobooth">
      <div className="bg-white-left">미리보기</div>
      <div className="bg-white-right">
        촬영하기
        <button type="button">찰칵</button>
        <Navigation />
      </div>
    </div>
  );
}

export default PhotoBooth;
