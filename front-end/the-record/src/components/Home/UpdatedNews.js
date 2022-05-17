import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import fourPhoto from '../../assets/fourphoto.png';
import store from '../../store';
import { actions } from '../../actions/common';
import callApi from '../../common/api';

function UpdatedNews() {
  const navigate = useNavigate();
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo);
  const [updatedPhotos, setUpdatedPhotos] = useState([]);
  const [updatedDiary, setUpdatedDiary] = useState([]);
  const [updatedMonth, setUpdatedMonth] = useState({});

  const handleUpdatedDiary = async () => {
    const res = await callApi({
      url: `/api/home/user/${homePageHostInfo.userPk}/diary`,
    });
    setUpdatedDiary(() => res);
  };

  const handleUpdatedPhoto = async () => {
    const res = await callApi({
      url: `/api/home/user/${homePageHostInfo.userPk}/diary`,
    });
    setUpdatedPhotos(() => res);
  };

  const handleUpdatedNews = async () => {
    const res = await callApi({
      url: `/api/home/user/${homePageHostInfo.userPk}/month`,
    });
    setUpdatedMonth(() => res);
  };

  const goDiaryDetails = diaryId => {
    store.dispatch(actions.setValue('navPage', 'nav-diary'));
    navigate('/diary/detail', { state: diaryId });
  };

  useEffect(() => {
    handleUpdatedPhoto();
    handleUpdatedDiary();
    handleUpdatedNews();
  }, [homePageHostInfo]);

  return (
    <div id="updated-news">
      <div className="updated-news-top">
        <div className="updated-diary-list">
          <p>Updated News</p>
          <hr />
          <div className="diary-list-box">
            {updatedDiary.length === 0 ? (
              <li style={{ fontSize: 14 }}>작성한 글이 없습니다</li>
            ) : (
              updatedDiary.map(diary => (
                <li key={`d-${diary.diaryId}`}>
                  <button
                    type="button"
                    onClick={() => goDiaryDetails(diary.diaryId)}
                  >
                    {diary.title}
                  </button>
                </li>
              ))
            )}
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td>다이어리</td>
              <td>
                {updatedMonth.diaryCurrentMonthCnt}/{updatedMonth.diaryAllCount}
              </td>
            </tr>
            <tr>
              <td>사진첩</td>
              <td>
                {updatedMonth.photoCurrentMonthCnt}/{updatedMonth.photoAllCount}
              </td>
            </tr>
            <tr>
              <td>방명록</td>
              <td>0/0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="updated-news-bottom">
        <p>Photo</p>
        <div className="updated-photo-zone">
          {updatedPhotos.length === 0 ? (
            <p>나만의 네컷을 업로드해보세요</p>
          ) : (
            updatedPhotos.map(photo => (
              <div className="photo-preview" key={`p-${photo.photoId}`}>
                <p>{photo.title}</p>
                <img src={fourPhoto} alt="네컷 사진" />
                <p>{photo.record_dt}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdatedNews;
