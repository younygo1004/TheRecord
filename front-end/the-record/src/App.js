import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DiaryMain from './pages/Diary/DiaryMain';
import DiaryDetail from './pages/Diary/DiaryDetail';
import Album from './pages/Photo/Album';
import HomeHeader from './components/Home/HomeHeader';
import PhotoDetail from './pages/Photo/PhotoDetail';
import PhotoBooth from './pages/Photo/PhotoBooth';

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
                <Route path="/diary/diarydetail" element={<DiaryDetail />} />
                <Route path="/album" element={<Album />} />
                <Route path="/album/photodetail" element={<PhotoDetail />} />
                <Route path="/album/photobooth" element={<PhotoBooth />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
