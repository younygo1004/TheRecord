import React from 'react';
import { useLocation } from 'react-router';
import Navigation from '../../components/Navigation';
import '../../styles/diary/makediary.css';
import DiaryList from '../../components/Diary/DiaryList';
import MakeDiaryButton from '../../components/Diary/MakeDiaryButton';
import MakeDiaryHeader from '../../components/Diary/MakeDiaryHeader';
import RecordVideo from '../../components/Diary/RecordVideo';
import RecordVoice from '../../components/Diary/RecordVoice';
import UploadPicture from '../../components/Diary/UploadPicture';

function MakeDiary() {
  const category = useLocation().state;

  const checkCategory = () => {
    if (category === 'video') {
      return <RecordVideo />;
    }
    if (category === 'picture') {
      return <UploadPicture />;
    }
    return <RecordVoice />;
  };

  return (
    <div id="make-diary">
      <div className="bg-white-left">
        <div className="diary-diarylist">
          <DiaryList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="make-diary-container">
          <div className="make-diary-box">
            <MakeDiaryHeader />
            {checkCategory()}
          </div>
          <MakeDiaryButton />
        </div>
        <Navigation />
      </div>
    </div>
  );
}

export default MakeDiary;
