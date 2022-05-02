import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import PhotoList from './PhotoList';
import '../../styles/photo/album.css';

function PhotoDetail() {
  const location = useLocation();
  const { photoInfo } = location.state;
  return (
    <div id="album">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <div>{photoInfo.title}</div>
        <Navigation />
      </div>
    </div>
  );
}
export default PhotoDetail;
