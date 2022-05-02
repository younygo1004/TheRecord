import React from 'react';
import Profile from '../components/Home/Profile';
import Navigation from '../components/Navigation';
import '../styles/home/home.css';
import '../styles/home/neighbor-button.css';

function Home() {
  return (
    <div id="home">
      <div className="bg-white-left">
        <Profile />
      </div>
      <div className="bg-white-right">
        Home
        <Navigation />
      </div>
    </div>
  );
}

export default Home;
