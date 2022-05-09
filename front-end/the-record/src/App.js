import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import DiaryMain from './pages/Diary/DiaryMain';
import Album from './pages/Photo/Album';
import HomeHeader from './components/Home/HomeHeader';
import PhotoDetail from './pages/Photo/PhotoDetail';
import PhotoBooth from './pages/Photo/PhotoBooth';
import DiaryDetail from './pages/Diary/DiaryDetail';

const BaseRouter = withRouter(() => {
  return (
    <div id="app">
      <div className="bg-green-box">
        <div className="bg-dot-box">
          <div className="bg-gray-box">
            <HomeHeader />
            <div className="bg-inner-box">
              <Route path="/home" component={Home} />
              <Route path="/diary" component={DiaryMain} />
              <Route path="/diary/diarydetail" exact component={DiaryDetail} />
              <Route path="/album" exact component={Album} />
              <Route path="/album/photodetail" exact component={PhotoDetail} />
              <Route path="/album/photobooth" exact component={PhotoBooth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function App() {
  return <BaseRouter />;
}

export default App;
