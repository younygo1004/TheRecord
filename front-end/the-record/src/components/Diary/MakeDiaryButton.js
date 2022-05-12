import React from 'react';

function MakeDiaryButton() {
  return (
    <div className="make-diary-button">
      <button className="make-diary-cancel" type="button">
        취소
      </button>
      <button className="make-diary-upload" type="button">
        업로드
      </button>
    </div>
  );
}

export default MakeDiaryButton;
