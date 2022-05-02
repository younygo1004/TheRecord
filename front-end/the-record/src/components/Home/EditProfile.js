import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FaceIcon from '@mui/icons-material/Face';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import '../../styles/home/edit-profile.css';

function EditProfile() {
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
  console.log(editProfileDialogOpen);

  // profile 사진은 세션에 올려둔 userInfo에서 가져옴
  const [profileImg, setProfileImg] = useState(
    '../../assets/my_profile_photo.png',
  );
  console.log(profileImg);
  console.log(setProfileImg);
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
  return (
    <div id="edit-profile">
      <button
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
                <button
                  type="button"
                  onClick={() => {
                    fileInput.current.click();
                  }}
                >
                  <ArrowRightIcon />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default EditProfile;
