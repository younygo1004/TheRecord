import React from 'react';
import { useNavigate } from 'react-router-dom';
import fourPhoto from '../../assets/fourphoto.png';
import store from '../../store';
import { ADD_NAVPAGE } from '../../actions/navigation';

function UpdatedNews() {
  // useEffect로 처음에 updated 게시물, 갯수 불러오기
  // 만약에 현재 사용자면 현재 사용자꺼 불러오고 아니면 -> 세션에 올려둔 사용자꺼!!!
  // useEffect로 처음에 최신 네컷 업데이트 불러오기
  const navigate = useNavigate();
  const goDiaryDetails = diaryId => {
    store.dispatch({ type: ADD_NAVPAGE, data: 'nav-diary' });
    navigate('/diary/detail', { state: diaryId });
  };

  const updatedPhotos = [
    {
      photoId: 1,
      title: '싸피친구들과',
      media_url: '',
      record_dt: '2022.XX.XX',
      visible: '',
    },
    {
      photoId: 2,
      title: '여행가서 한 컷',
      media_url: '',
      record_dt: '2022.XX.XX',
      visible: '',
    },
    {
      photoId: 3,
      title: '이렇게길게쓰면어떻게되나요',
      media_url: '',
      record_dt: '2022.XX.XX',
      visible: '',
    },
  ];

  const updatedDiary = [
    {
      diaryId: 0,
      title: '백만원만 가져와',
      recordDt: '2022-05-02',
    },
    {
      diaryId: 1,
      title: '백만원만 가져와ddddddddddddddddddddddddddddddddddddddddddddd',
      recordDt: '2022-05-02',
    },
    {
      diaryId: 2,
      title: '백만원만 가져와',
      recordDt: '2022-05-02',
    },
    {
      diaryId: 3,
      title: '백만원만 가져와',
      recordDt: '2022-05-02',
    },
  ];

  return (
    <div id="updated-news">
      <div className="updated-news-top">
        <div className="updated-diary-list">
          <p>Updated News</p>
          <hr />
          <div className="diary-list-box">
            {updatedDiary.map(diary => (
              <li key={diary.diaryId}>
                <button
                  type="button"
                  onClick={() => goDiaryDetails(diary.diaryId)}
                >
                  {diary.title}
                </button>
              </li>
            ))}
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td>다이어리</td>
              <td>4/10</td>
            </tr>
            <tr>
              <td>사진첩</td>
              <td>4/10</td>
            </tr>
            <tr>
              <td>방명록</td>
              <td>4/10</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="updated-news-bottom">
        <p>Photo</p>
        <div className="updated-photo-zone">
          {updatedPhotos.map(photo => (
            <div className="photo-preview" key={photo.photoId}>
              <p>{photo.title}</p>
              <img src={fourPhoto} alt="네컷 사진" />
              <p>{photo.record_dt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpdatedNews;
