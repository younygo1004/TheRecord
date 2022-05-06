import React from 'react';
import '../../styles/photo/album.css';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import { useHistory } from 'react-router-dom';

function PhotoList() {
  // 일기목록 불러오는 api 연결
  // const [photolist, setPhotolist] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('url', {
  //       headers: {
  //         "x-auth-token": sessiontStorage.getItem("jwt"),
  //       },
  //     })
  //     .then((res) => {
  //         setPhotolist(res.data);
  //     });
  // }, []);
  const list = [
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

  const history = useHistory();

  const movePhotoDetail = listitem => {
    history.push({
      pathname: '/album/photodetail',
      state: {
        photoInfo: listitem,
      },
    });
  };

  return (
    <div className="photolist">
      <p className="photolist-text">나만의 네컷 목록</p>
      <hr />
      <div className="photolist-box">
        {list.map(listitem => (
          <div
            key={listitem.photoId}
            role="button"
            tabIndex={0}
            className="photolist-item"
            onClick={() => movePhotoDetail(listitem)}
            onKeyUp={() => movePhotoDetail(listitem)}
          >
            <InsertPhotoOutlinedIcon className="photolist-icon" />
            <div className="photolist-title">{listitem.title} &nbsp;</div>
            <div className="photolist-title">{listitem.record_dt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoList;
