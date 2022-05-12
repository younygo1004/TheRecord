import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function MakeDiaryHeader() {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    // display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? '#177ddc'
              : 'rgba(29, 142, 174, 0.87)',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,.35)'
          : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  const [checked, setChecked] = useState(true);
  const [folderListOpen, setFolderListOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');
  // 폴더 조회 api 연결
  const folderlist = [
    {
      folderId: 2,
      folderName: '기분 좋은 날',
    },
    {
      folderId: 3,
      folderName: 'CSS 너무 어렵다 ㅠㅠㅠㅠㅠㅠㅠ',
    },
  ];

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <div className="make-diary-header">
      {/* 일기 제목 글자 제한 몇 글자? */}
      <input type="text" maxLength="20" />
      <div className="make-diary-header-div">
        <div>
          <button
            type="button"
            onClick={() => setFolderListOpen(!folderListOpen)}
            // className="make-dialog-input"
          >
            {selectedFolder}
            {folderListOpen ? (
              <ArrowDropUpIcon
                color="action"
                // className="make-dialog-input-btn"
              />
            ) : (
              <ArrowDropDownIcon
                color="action"
                // className="make-dialog-input-btn"
              />
            )}
          </button>
          <div className="photobooth-num-list">
            {folderListOpen
              ? folderlist.map(folder => (
                  <button
                    type="button"
                    // className="photobooth-num-listitem"
                    key={folder.folderId}
                    onClick={() => [
                      setSelectedFolder(folder.folderName),
                      setFolderListOpen(false),
                    ]}
                  >
                    {folder.folderName}
                  </button>
                ))
              : ''}
          </div>
        </div>
        <div className="make-diary-header-visible">
          <p>나만 보기</p>
          <AntSwitch
            checked={checked}
            onChange={event => handleChange(event)}
            inputProps={{ 'aria-label': 'ant design' }}
          />
        </div>
      </div>
    </div>
  );
}

export default MakeDiaryHeader;
