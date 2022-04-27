import React from 'react';
import '../styles/home/home.css';
import Navigation from '../components/Navigation';
import HomeHeader from '../components/Home/HomeHeader';

function Home() {
  return (
    <div id="home">
      <div className="bg-green-box">
        <div className="bg-dot-box">
          <div className="bg-gray-box">
            <HomeHeader />
            <div className="bg-inner-box">
              <div className="bg-white-left" />
              <div className="bg-white-right">
                <Navigation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
