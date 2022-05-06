import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/photo/album.css';
import LinkedCameraOutlinedIcon from '@material-ui/icons/LinkedCameraOutlined';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import enterPhotoBooth from '../../assets/enterPhotoBooth.png';

function EnterBoothButton() {
  const history = useHistory();
  const [enterBoothDialogOpen, setenterBoothDialogOpen] = useState(false);
  const [roomcode, setRoomcode] = useState('');
  const handleClose = () => {
    setenterBoothDialogOpen(false);
    setRoomcode('');
  };

  const movePhotobooth = () => {
    // 방 코드 유효성 검사 필요
    history.push({ pathname: '/album/photobooth' });
  };

  return (
    <div>
      <button
        type="button"
        className="album-btn"
        onClick={() => {
          setenterBoothDialogOpen(true);
        }}
      >
        <LinkedCameraOutlinedIcon className="album-btn-icon" fontSize="small" />
        포토부스 입장하기
      </button>
      <div>
        <Dialog
          open={enterBoothDialogOpen}
          onClose={handleClose}
          id="dialog"
          className="photobooth-dialog"
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
              <p>입장하기</p>
            </div>
            <Button
              sx={{
                minWidth: 36,
                height: 49,
              }}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseRoundedIcon
                sx={{
                  fontSize: 29,
                }}
              />
            </Button>
          </DialogTitle>
          <div className="dialog-body-box">
            <div className="dialog-body photobooth-dialog-body">
              <img src={enterPhotoBooth} alt="입장하기" />
              <p className="photobooth-dialog-title">포토부스 입장하기</p>
              <p>방 코드를 입력해주세요</p>
              <input
                className="enter-dialog-input"
                onChange={e => {
                  setRoomcode(e.target.value);
                }}
              />
              {roomcode ? (
                <button
                  type="button"
                  className="photobooth-dialog-btn"
                  onClick={() => movePhotobooth()}
                >
                  입장하기
                </button>
              ) : (
                <button
                  type="button"
                  className="grey-photobooth-dialog-btn"
                  disabled
                >
                  입장하기
                </button>
              )}
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default EnterBoothButton;
