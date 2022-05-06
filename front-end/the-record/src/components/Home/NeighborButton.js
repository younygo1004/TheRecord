import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import MyNeighborList from './MyNeighborList';

function NeighborButton() {
  const history = useHistory();
  const handleHost = neighbor => {
    console.log(neighbor);
    // neighbor.userPk로 사용자 정보 요청해서 history로 넘겨주기

    sessionStorage.setItem('homePageHost', neighbor.name);
    history.push({
      pathname: '/home',
    });
  };

  const [neighborName, setNeighborName] = useState('');
  const [neighborDialogOpen, setNeighborDialogOpen] = useState(false);
  const [neighborList, setNeighborList] = useState([]);
  console.log(neighborDialogOpen);

  const handleClose = () => {
    setNeighborDialogOpen(false);
    setNeighborName('');
    setNeighborList([]);
  };

  const searchNeighbor = () => {
    console.log('검색', neighborName);
    // api 요청 (검색어와 일치하는 이름의 이용자)
    const res = [
      {
        userPk: 0,
        userId: 'aaa123',
        name: '김유정',
      },
      {
        userPk: 1,
        userId: 'bbb123',
        name: '장성태',
      },
      {
        userPk: 2,
        userId: 'ccc123',
        name: '오은진',
      },
      {
        userPk: 3,
        userId: 'aaa123',
        name: '이주형',
      },
      {
        userPk: 4,
        userId: 'bbb123',
        name: '조용구',
      },
      {
        userPk: 5,
        userId: 'ccc123',
        name: '오수경',
      },
    ];
    setNeighborList(res);
    console.log(neighborList);

    // document.querySelector('.neighbor-input').value = '';
  };

  const searchResult = () => {
    if (neighborList.length === 0) {
      return (
        <p style={{ width: '100%', textAlign: 'center' }}>
          이름을 입력하여 친구를 찾아보세요
        </p>
      );
    }
    return neighborList.map(neighbor => (
      <div className="neighbor-searchlist-item" key={neighbor.userPk}>
        <button
          type="button"
          onClick={() => [handleHost(neighbor), handleClose()]}
        >
          <HomeIcon sx={{ mr: 1 }} />
          {neighbor.name}({neighbor.userId})
        </button>
      </div>
    ));
  };

  return (
    <div id="neighbor-button">
      <button
        className="ilchon-button"
        type="button"
        onClick={() => {
          setNeighborDialogOpen(true);
        }}
      >
        <StarIcon sx={{ mr: 1 }} />
        일촌 관리
      </button>

      <div>
        <Dialog
          open={neighborDialogOpen}
          onClose={handleClose}
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
              <StarIcon sx={{ mr: 1 }} />
              <p>일촌 관리</p>
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
            <div className="dialog-body neighbor-button-dialog-body">
              <div className="neighbor-search-box">
                <div className="neighbor-search">
                  <SearchRoundedIcon
                    sx={{
                      fontSize: 36,
                      pb: 0.3,
                    }}
                  />
                  <input
                    className="neighbor-input"
                    placeholder="친구 찾기"
                    onChange={e => {
                      setNeighborName(e.target.value);
                    }}
                    onKeyDown={e => {
                      if (e.keyCode === 13) {
                        searchNeighbor();
                      }
                    }}
                  />
                  <button type="button" onClick={() => searchNeighbor()}>
                    검색
                  </button>
                </div>
                <div className="neighbor-searchlist-box">{searchResult()}</div>
              </div>
              <MyNeighborList />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default NeighborButton;
