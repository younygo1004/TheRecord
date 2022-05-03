import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/photo/album.css';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import fourphoto from '../../assets/fourphoto.png';

function PhotoPreview() {
  const history = useHistory();
  // 일기목록 페이지 별로 불러오는 api 연결
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

  const totalPage = 5;
  // 인생네컷 전체 페이지 수 불러오는 api 연결
  // const [totalPage, setTotalPage] = useState(0);
  // useEffect(() => {
  //   axios
  //     .get('url', {
  //       headers: {
  //         "x-auth-token": sessiontStorage.getItem("jwt"),
  //       },
  //     })
  //     .then((res) => {
  //         setTotalPage(res.data);
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

  const [page, setPage] = React.useState(1);
  const changePage = (event, value) => {
    setPage(value);
  };

  const moveRight = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  const moveLeft = () => {
    const newPage = page - 1;
    setPage(newPage);
  };

  const movePhotoDetail = photo => {
    history.push({
      pathname: '/album/photodetail',
      state: {
        photoInfo: photo,
      },
    });
  };

  return (
    <div>
      <div className="photopreview">
        {totalPage > 1 && page !== 1 ? (
          <button
            type="button"
            className="preview-arrow-btn"
            onClick={moveLeft}
          >
            <ArrowLeftOutlinedIcon />
          </button>
        ) : (
          <ArrowLeftOutlinedIcon className="preview-no-btn" />
        )}
        {photos.map(photo => (
          <div
            key={photo.photoId}
            className="preview-item"
            role="button"
            tabIndex={0}
            onClick={() => movePhotoDetail(photo)}
            onKeyUp={() => movePhotoDetail(photo)}
          >
            <div className="preview-title">{photo.title}</div>
            <img src={fourphoto} alt="인생네컷" className="preview-img" />
            <div className="preview-date">{photo.record_dt}</div>
          </div>
        ))}
        {totalPage > 1 && page !== totalPage ? (
          <button
            type="button"
            className="preview-arrow-btn"
            onClick={moveRight}
          >
            <ArrowRightOutlinedIcon />
          </button>
        ) : (
          <ArrowRightOutlinedIcon className="preview-no-btn" />
        )}
      </div>
      <div className="preview-pagebtn">
        {totalPage > 1 ? (
          <Stack>
            <Pagination
              count={totalPage}
              page={page}
              onChange={changePage}
              size="small"
            />
          </Stack>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default PhotoPreview;
