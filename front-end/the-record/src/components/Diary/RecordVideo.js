import React, { useRef, useState } from 'react';
// import axios from 'axios';

function RecordVideo({ sendVideo }) {
  const videoRef = useRef(null);
  const [recorded, setRecorded] = useState(false);
  const [recordedVideoURL, setrecordedVideoURL] = useState();
  const [videoRecorder, setVideoRecorder] = useState({});
  // const GOOGLE_API_TOKEN = process.env.REACT_APP_GOOGLE_API_TOKEN;

  const sendSpeech = result => {
    console.log('전송');
    console.log(result);

    // fetch(
    //   `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_TOKEN}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       config: {
    //         encoding: 'LINEAR16',
    //         languageCode: 'ko-KR',
    //       },
    //       audio: {
    //         content: result,
    //       },
    //     }),
    //   },
    // )
    //   .then(resp => resp.json())
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log('Error: ', err);
    //   });
  };

  const recordingStart = mediaStream => {
    console.log('video capture start');

    const videoData = [];
    const newVideoRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm; codecs=vp9',
    });

    newVideoRecorder.ondataavailable = event => {
      if (event.data?.size > 0) {
        videoData.push(event.data);
      }
    };

    newVideoRecorder.onstop = () => {
      const videoBlob = new Blob(videoData, { type: 'video/webm' });
      setrecordedVideoURL(window.URL.createObjectURL(videoBlob));
      const reader = new FileReader();
      reader.readAsDataURL(videoBlob);
      reader.onloadend = () => {
        // 구글 스피치 보내기
        sendSpeech(reader.result);
        const data = reader.result.split('base64,')[1];
        console.log(data);
        const array = [];
        for (let i = 0; i < data.length; i += 1) {
          array.push(data.charCodeAt(i));
        }
        const file = new File([new Uint8Array(array)], { type: 'video/webm' });
        const formdata = new FormData();
        formdata.append('file', file);
        console.log(file);
        // 임시 설정
        // sendVideo(formdata);
        console.log(sendVideo);
        console.log('video capture end');
      };
    };

    newVideoRecorder.start();
    console.log(newVideoRecorder);
    setVideoRecorder(newVideoRecorder);
  };

  const videoCaptureStart = () => {
    setrecordedVideoURL(null);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: 360,
          height: 170,
        },
      })
      .then(mediaStream => {
        videoRef.current.srcObject = mediaStream;
        videoRef.onloadedmetadata = () => {
          videoRef.play();
        };
        setRecorded(true);
        recordingStart(mediaStream);
      })
      .catch(err => console.log(err));
  };

  const VideoCaptureEnd = () => {
    console.log(videoRecorder);
    if (videoRecorder) {
      videoRecorder.stop();
      setVideoRecorder(null);
      setRecorded(false);
    }
  };

  return (
    <div className="record-video">
      <div className="record-video-btn-div">
        {recorded ? (
          <button
            type="button"
            className="record-video-cancel-btn"
            onClick={() => {
              VideoCaptureEnd();
            }}
          >
            녹화 끝
          </button>
        ) : (
          <button
            type="button"
            className="record-video-btn"
            onClick={() => {
              videoCaptureStart();
            }}
          >
            녹화 시작
          </button>
        )}
      </div>

      <div className="record-video-box">
        {recordedVideoURL === null ? (
          <video ref={videoRef} autoPlay className="video-div">
            <track kind="captions" />
          </video>
        ) : null}
        {recordedVideoURL ? (
          <>
            <video
              src={recordedVideoURL}
              autoPlay
              controls
              className="video-div"
            >
              <track kind="captions" />
            </video>
            <textarea className="record-video-text" />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default RecordVideo;
