import React, { useState } from 'react';
import '../../styles/diary/makediary.css';
// import axios from 'axios';

function RecordVoice({ sendVoice }) {
  const [media, setMedia] = useState();
  const [isRecord, setIsRecord] = useState(false);
  // const GOOGLE_API_TOKEN = process.env.REACT_APP_GOOGLE_API_TOKEN;

  const sendSpeech = async result => {
    console.log('전송');
    console.log(result);
    // const url = `https://speech.googleapis.com/v1/speech:longrunningrecognize?key=${GOOGLE_API_TOKEN}`;
    // const request = {
    //   audio: { content: result },
    //   config: {
    //     encoding: 'WEBM_OPUS',
    //     languageCode: 'ko-KR',
    //     sampleRateHertz: 48000,
    //     enableWordTimeOffsets: true,
    //   },
    // };
    // const text = await axios.request({
    //   url,
    //   method: 'POST',
    //   data: request,
    // });
    // .then(response => {
    //   console.log(response.data.results);
    // })
    // .catch(err => {
    //   console.log('err :', err);
    // });
  };

  const voiceRecordStart = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm; codecs=opus',
        });
        mediaRecorder.start();
        setMedia(mediaRecorder);
        console.log(mediaRecorder);
      })
      .catch(err => console.log(err));
  };

  const voiceRecordStop = () => {
    console.log('중지');
    media.ondataavailable = e => {
      const reader = new FileReader();
      reader.readAsDataURL(e.data);
      reader.onloadend = () => {
        sendSpeech(reader.result.split('base64,')[1]);
        const data = reader.result.split('base64,')[1];
        const array = [];
        for (let i = 0; i < data.length; i += 1) {
          array.push(data.charCodeAt(i));
        }
        const file = new File([new Uint8Array(array)], { type: 'audio/mpeg' });
        const formdata = new FormData();
        formdata.append('file', file);
        console.log(file);
        // 임시 설정
        // sendVoice(formdata);
        console.log(sendVoice);
      };
    };
    media.stop();
  };

  const recordVoice = () => {
    if (isRecord) {
      return (
        <button
          type="button"
          className="record-voice-btn"
          onClick={() => {
            voiceRecordStop();
            setIsRecord(false);
          }}
        >
          <img
            src={require('../../assets/MIC.png')}
            alt="녹화"
            className="profile-img"
          />
        </button>
      );
    }
    return (
      <button
        type="button"
        className="record-voice-btn"
        onClick={() => {
          voiceRecordStart();
          setIsRecord(true);
        }}
      >
        <img
          src={require('../../assets/MIC.png')}
          alt="녹화"
          className="profile-img"
        />
      </button>
    );
  };

  return (
    <div className="record-voice">
      <div className="wrapper-div">
        <div className="first-wrapper">
          <div className="sound-wave">
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
          </div>
        </div>
        <div className="second-wrapper">
          <div className="sound-wave">
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
          </div>
        </div>
        {recordVoice()}
        <div className="third-wrapper">
          <div className="sound-wave">
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
          </div>
        </div>
        <div className="fourth-wrapper">
          <div className="sound-wave">
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
          </div>
        </div>
      </div>
      <div className="record-text-div">
        <textarea className="record-text" />
      </div>
    </div>
  );
}

export default RecordVoice;
