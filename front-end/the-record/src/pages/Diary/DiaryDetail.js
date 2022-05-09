import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import DiaryList from './DiaryList';
import '../../styles/diary/diarymain.css';

function DiaryDetail() {
  const location = useLocation();
  const { DiaryInfo } = location.state;
  return (
    <div id="diarymain">
      <div className="bg-white-left">
        <div className="diary-diarylist">
          <DiaryList />
        </div>
      </div>
      <div className="bg-white-right">
        <div>{DiaryInfo.title}</div>
        <Navigation />
      </div>
    </div>
  );
}
export default DiaryDetail;
