import React from 'react';
import { Route, withRouter } from 'react-router-dom';
// import Login from './pages/User/Login';
import Home from './pages/Home';
import DiaryMain from './pages/Diary/DiaryMain';
import Album from './pages/Photo/Album';
import HomeHeader from './components/Home/HomeHeader';

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
              <Route path="/album" component={Album} />
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
