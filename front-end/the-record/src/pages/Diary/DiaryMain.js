import React from 'react';
import Navigation from '../../components/Navigation';
import '../../styles/diary/diarymain.css';

function DiaryMain() {
  return (
    <div id="diarymain">
      <div className="bg-white-left">왼쪽</div>
      <div className="bg-white-right">
        DiaryMain
        <Navigation />
      </div>
    </div>
  );
}

export default DiaryMain;
