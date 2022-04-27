import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from './pages/User/Login';
import Home from './pages/Home';
import DiaryMain from './pages/Diary/DiaryMain';
import Album from './pages/Photo/Album';

const BaseRouter = withRouter(() => {
  return (
    <div id="app">
      <Route path="/" exact component={Login} />

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
