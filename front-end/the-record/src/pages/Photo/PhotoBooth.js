import React, { Component } from 'react';
import OpenViduSession from 'openvidu-react';
import axios from 'axios';
import Navigation from '../../components/Navigation';
import '../../styles/photo/photobooth.css';

export default class PhotoBooth extends Component {
  constructor(props) {
    super(props);
    this.OPENVIDU_SERVER_URL = `https://k6b204.p.ssafy.io`;
    this.OPENVIDU_SERVER_SECRET = 'record1014!';
    this.state = {
      mySessionId: 'SessionA',
      myUserName: `OpenVidu_User_${Math.floor(Math.random() * 100)}`,
      token: undefined,
      session: undefined,
    };

    // this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
    this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
    // this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.joinSession = this.joinSession.bind(this);
  }

  // handlerJoinSessionEvent() {
  //   console.log('Join session');
  // }

  handlerLeaveSessionEvent() {
    console.log('Leave session');
    this.setState({
      session: undefined,
    });
  }

  // handlerErrorEvent() {
  //   console.log('Leave session');
  // }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  getToken() {
    // eslint-disable-next-line
    return this.createSession(this.state.mySessionId)
      .then(sessionId => this.createToken(sessionId))
      .catch(Err => console.error(Err));
  }

  joinSession(event) {
    event.preventDefault();
    // eslint-disable-next-line
    if (this.state.mySessionId && this.state.myUserName) {
      this.getToken().then(token => {
        this.setState({
          token,
          session: true,
        });
      });
      event.preventDefault();
    }
  }

  createSession(sessionId) {
    return new Promise(resolve => {
      const data = JSON.stringify({ sessionName: sessionId });
      axios
        .post(`${this.OPENVIDU_SERVER_URL}/api/photobooth/get-token`, data, {
          headers: {
            Authorization: `Basic ${btoa(
              `OPENVIDUAPP:${this.OPENVIDU_SERVER_SECRET}`,
            )}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch(response => {
          const error = { ...response };
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              `No connection to OpenVidu Server. This may be a certificate error at ${this.OPENVIDU_SERVER_URL}`,
            );
            if (
              // eslint-disable-next-line
              window.confirm(
                `No connection to OpenVidu Server. This may be a certificate error at "${this.OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
                  `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${this.OPENVIDU_SERVER_URL}"`,
              )
            ) {
              window.location.assign(
                `${this.OPENVIDU_SERVER_URL}/accept-certificate`,
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({});
      axios
        .post(
          `${this.OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${this.OPENVIDU_SERVER_SECRET}`,
              )}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch(error => reject(error));
    });
  }

  render() {
    const { mySessionId } = this.state;
    const { myUserName } = this.state;
    const { token } = this.state;
    const { session } = this.state;

    return (
      <div id="photobooth">
        <div className="bg-white-left">미리보기</div>
        <div className="bg-white-right">
          촬영하기
          <div style={{ width: '100%', height: '100%' }}>
            {session === undefined ? (
              <div id="join">
                <div id="join-dialog">
                  <h1> Join a video session </h1>
                  <form onSubmit={this.joinSession}>
                    <p>
                      <label>Participant: </label>
                      <input
                        type="text"
                        id="userName"
                        value={myUserName}
                        onChange={this.handleChangeUserName}
                        required
                      />
                    </p>
                    <p>
                      <label> Session: </label>
                      <input
                        type="text"
                        id="sessionId"
                        value={mySessionId}
                        onChange={this.handleChangeSessionId}
                        required
                      />
                    </p>
                    <p>
                      <input name="commit" type="submit" value="JOIN" />
                    </p>
                  </form>
                </div>
              </div>
            ) : (
              <div id="session">
                <OpenViduSession
                  id="opv-session"
                  sessionName={mySessionId}
                  user={myUserName}
                  token={token}
                  joinSession={console.log('Join session')}
                  leaveSession={this.handlerLeaveSessionEvent}
                  error={console.log('Leave session')}
                />
              </div>
            )}
            <button type="button">찰칵</button>
          </div>
          <Navigation />
        </div>
      </div>
    );
  }
}
