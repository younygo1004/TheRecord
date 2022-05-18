import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import PhotoList from '../../components/Album/PhotoList'
import '../../styles/photo/photo-detail.css'

function PhotoDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const { photoInfo } = location.state
  const [photoDetail, setPhotoDetail] = useState([])

  useEffect(() => {
    axios
      .get(`https://the-record.co.kr:8080/api/photo/${photoInfo.photoId}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('jwt'),
        },
      })
      .then(res => {
        console.log(res.data)
        setPhotoDetail(res.data)
      })
  }, [photoInfo])

  // 사진 수정
  const modifyPhoto = () => {
    navigate('/album/photoedit', {
      state: {
        photoDetail,
      },
    })
  }

  // 사진 삭제
  const deletePhoto = () => {
    axios({
      method: 'delete',
      url: `https://the-record.co.kr:8080/api/photo/${photoInfo.photoId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('jwt'),
      },
    })
      .then(res => {
        console.log(res)
        navigate('/album')
      })
      .catch(res => {
        console.log(res)
      })
  }
  return (
    <div id="album" className="photo-detail">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="photo-detail-box">
          <div className="detail-info-box">
            <div className="photo-detail-header">
              <div>
                <div className="photo-detail-title">{photoInfo.title}</div>
                <div className="photo-detail-date">{photoInfo.recordDt}</div>
              </div>
              <div>
                <button
                  className="photo-detail-btn"
                  type="button"
                  onClick={modifyPhoto}
                >
                  수정
                </button>
                <span style={{ color: '#848484' }}>|</span>
                <button
                  className="photo-detail-btn"
                  type="button"
                  onClick={deletePhoto}
                >
                  삭제
                </button>
              </div>
            </div>
            <hr />
            <div className="photo-detail-private">
              {photoInfo.visible === 'PUBLIC' ? (
                <div>전체공개</div>
              ) : (
                <div>나만보기</div>
              )}
            </div>
            <img
              alt="사진첩 상세 이미지"
              src={`https://s3.ap-northeast-2.amazonaws.com/the-record.bucket/${photoDetail.mediaUrl}`}
            />
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PhotoDetail
