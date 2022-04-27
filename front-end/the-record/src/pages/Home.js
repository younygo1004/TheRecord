import React from 'react';
import Navigation from '../components/Navigation';
import '../styles/home/home.css';

function Home() {
  return (
    <div id="home">
      <div className="bg-white-left">왼쪽</div>
      <div className="bg-white-right">
        Home
        <Navigation />
      </div>
    </div>
  );
}

export default Home;
