import React from 'react';
import '../../styles/photo/album.css';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import fourphoto from '../../assets/fourphoto.png';

function PhotoPreview() {
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
  const photos = [
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
  return (
    <div className="photopreview">
      <ArrowLeftOutlinedIcon />
      {photos.map(photo => (
        <div key={photo.photoId} className="preview-item">
          <div className="preview-title">{photo.title}</div>
          <img src={fourphoto} alt="인생네컷" className="preview-img" />
          <div>{photo.record_dt}</div>
        </div>
      ))}
      <ArrowRightOutlinedIcon />
    </div>
  );
}

export default PhotoPreview;
