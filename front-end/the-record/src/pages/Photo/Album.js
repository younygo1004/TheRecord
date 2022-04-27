import React from 'react';
import Navigation from '../../components/Navigation';
import '../../styles/photo/album.css';

function Album() {
  return (
    <div id="album">
      <div className="bg-white-left">왼쪽</div>
      <div className="bg-white-right">
        Album
        <Navigation />
      </div>
    </div>
  );
}

export default Album;
