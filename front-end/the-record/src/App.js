import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DiaryMain from './pages/Diary/DiaryMain';
import Album from './pages/Photo/Album';
import HomeHeader from './components/Home/HomeHeader';
import PhotoDetail from './pages/Photo/PhotoDetail';
import PhotoBooth from './pages/Photo/PhotoBooth';
import PhotoDeco from './pages/Photo/PhotoDeco';
import PhotoDecoUpload from './pages/Photo/PhotoDecoUpload';

function App() {
  return (
    <div id="app">
      <div className="bg-green-box">
        <div className="bg-dot-box">
          <div className="bg-gray-box">
            <HomeHeader />
            <div className="bg-inner-box">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/diary" element={<DiaryMain />} />
                <Route path="/album" element={<Album />} />
                <Route path="/album/photodetail" element={<PhotoDetail />} />
                <Route path="/album/photobooth" element={<PhotoBooth />} />
                <Route path="/album/photodeco" element={<PhotoDeco />} />
                <Route
                  path="/album/photodeco/upload"
                  element={<PhotoDecoUpload />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
