import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';

function MyNeighborList() {
  const [ListOpen, setListOpen] = useState(false);
  const history = useHistory();
  const handleHost = neighbor => {
    console.log(neighbor);
    // neighbor.userPk로 사용자 정보 요청해서 history로 넘겨주기

    sessionStorage.setItem('homePageHost', neighbor.name);
    history.push({
      pathname: '/home',
    });
  };
  // useEffect 로그인한 유저의 일촌 목록 불러오기
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

  const neighborList = () => {
    return res.map(neighbor => (
      <div key={neighbor.userPk} className="my-neighbor-list-item">
        <HomeIcon sx={{ mr: 1 }} />
        <button type="button" onClick={() => [handleHost(neighbor)]}>
          {neighbor.name} ({neighbor.userId})
        </button>
      </div>
    ));
  };

  return (
    <div id="my-neighbor-list">
      <button type="button" onClick={() => setListOpen(!ListOpen)}>
        <div />
        <div className="ilchon-surf-button">
          <StarIcon />
          <p>일촌 파도타기</p>
        </div>
        {ListOpen ? (
          <ArrowDropUpIcon color="action" />
        ) : (
          <ArrowDropDownIcon color="action" />
        )}
      </button>

      <div className="my-neighbor-list">{ListOpen && neighborList()}</div>
    </div>
  );
}

export default MyNeighborList;
