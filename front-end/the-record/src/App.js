import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from './pages/User/Login';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import DiaryMain from './pages/Diary/DiaryMain';
import Album from './pages/Photo/Album';

const BaseRouter = withRouter(({ location }) => {
  return (
    <div className="app">
      <Route path="/" exact component={Login} />

      {/* 예외처리 */}
      {location.pathname !== '/' && <Navigation />}

      <Route path="/home" component={Home} />
      <Route path="/diary" component={DiaryMain} />
      <Route path="/album" component={Album} />
    </div>
  );
});

function App() {
  return <BaseRouter />;
}

export default App;
