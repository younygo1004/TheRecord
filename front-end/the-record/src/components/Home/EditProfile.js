import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FaceIcon from '@mui/icons-material/Face';
import EditButton from '../../assets/edit_button.png';
import '../../styles/home/edit-profile.css';

function EditProfile() {
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
  // 초기값 = 처음 로그인할 때 세션에 올려놓은 자기소개(useEffect)
  // eslint-disable-next-line
  const [profileText, setProfileText] = useState('자기소개 입니다');

  // profile 사진은 세션에 올려둔 userInfo에서 가져옴
  // eslint-disable-next-line
  const [profileImg, setProfileImg] = useState(
    '../../assets/my_profile_photo.png',
  );
  // console.log(setProfileImg);
  const fileInput = useRef(null);

  const handleProfileImg = e => {
    if (e.target.files[0]) {
      console.log('변경');
      // setProfileImg(e.target.files[0]);
    } else {
      // 업로드 취소할 시
      console.log('취소');
    }

    // 화면에 프로필 사진 표시
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setImage(reader.result);
    //   }
    // };
    // reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfile = () => {
    // axios로 변경 사항 요청 보내기

    setEditProfileDialogOpen(false);
  };

  return (
    <div id="edit-profile">
      <button
        className="header-right-button"
        type="button"
        onClick={() => {
          setEditProfileDialogOpen(true);
        }}
      >
        프로필 수정하기
      </button>

      <div>
        <Dialog
          open={editProfileDialogOpen}
          onClose={() => setEditProfileDialogOpen(false)}
          id="dialog"
          aria-labelledby="dialog-container"
          aria-describedby="dialog-description"
          PaperProps={{
            sx: {
              minWidth: 800,
              borderRadius: 2.7,
            },
          }}
        >
          <DialogTitle id="dialog-container" className="dialog-header">
            <div className="dialog-title">
              <FaceIcon sx={{ fontSize: 26 }} />
              <p>프로필 수정</p>
            </div>

            <Button
              sx={{
                minWidth: 36,
                height: 49,
              }}
              onClick={() => setEditProfileDialogOpen(false)}
            >
              <CloseRoundedIcon
                sx={{
                  fontSize: 29,
                }}
              />
            </Button>
          </DialogTitle>

          <div className="dialog-body-box">
            <div className="dialog-body edit-profile-dialog-body">
              <div className="edit-profile-img">
                <img
                  src={require('../../assets/my_profile_photo.png')}
                  alt="myProfile"
                />
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/jpg,impge/png,image/jpeg"
                  name="profile_img"
                  onChange={e => handleProfileImg(e)}
                  ref={fileInput}
                />
                <div className="profileImg-edit-button">
                  <button
                    type="button"
                    onClick={() => {
                      fileInput.current.click();
                    }}
                  >
                    <img src={EditButton} alt="수정버튼" />
                    <p>EDIT</p>
                  </button>
                </div>
              </div>
              <textarea
                value={profileText}
                onChange={e => setProfileText(e.currentTarget.value)}
              />
              <button
                className="edit-done-button"
                type="submit"
                onClick={() => updateProfile()}
              >
                수정 완료
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default EditProfile;
