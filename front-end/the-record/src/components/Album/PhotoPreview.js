import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/photo/album.css';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import fourphoto from '../../assets/fourphoto.png';

function PhotoPreview() {
  const navigate = useNavigate();
  const [photolist, setPhotolist] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalPage, setTotalPage] = useState(0);

  // 일기목록 페이지 별로 불러오는 api 연결
  useEffect(() => {
    axios
      .get(`https://the-record.co.kr:8080/api/photo/2/${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('jwt'),
        },
      })
      .then(res => {
        console.log(res.data);
        setPhotolist(res.data);
      });
  }, [page]);
  // 인생네컷 전체 페이지 수 불러오는 api 연결
  useEffect(() => {
    axios
      .get(`https://the-record.co.kr:8080/api/photo/2/page`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('jwt'),
        },
      })
      .then(res => {
        console.log(res.data);
        setTotalPage(res.data);
      });
  }, []);
  const changePage = (event, value) => {
    console.log(page);
    setPage(value - 1);
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
    navigate('/album/photodetail', {
      state: {
        photoInfo: photo,
      },
    });
  };

  return (
    <div>
      <div className="photopreview">
        {totalPage > 0 && page !== 0 ? (
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
        {photolist.map(photo => (
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
        {totalPage > 0 && page !== totalPage ? (
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
        {totalPage > 0 ? (
          <Stack>
            <Pagination
              count={totalPage + 1}
              page={page + 1}
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
