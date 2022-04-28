import React, { useState } from 'react';
import styled from 'styled-components';
// import { useHistory } from 'react-router-dom';
import fetchLogin from './service';

function Login() {
  // const history = useHistory();

  const [account, setAccount] = useState({
    id: '',
    password: '',
  });

  const onChangeAccount = e => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onSubmitAccount = async () => {
    try {
      const JWT = await fetchLogin(account);

      sessionStorage.setItem('jwt', JWT);
    } catch (error) {
      // window.alert(error);
    }
  };
  return (
    <Container>
      <DivStyle>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px',
            width: '400px',
          }}
        >
          <Input
            id="id"
            name="id"
            placeholder="아이디"
            onChange={onChangeAccount}
          />
          <Input
            id="password"
            name="password"
            placeholder="비밀번호"
            onChange={onChangeAccount}
          />
        </div>
        <div>
          <LoginButton onClick={onSubmitAccount}>로그인</LoginButton>
          <ForgotPwd>비밀번호를 잊으셨나요?</ForgotPwd>
        </div>
      </DivStyle>
      <DivStyle2>
        <hr style={{ width: '300px' }} />
        <OrDiv>또는</OrDiv>
        <hr width="300px" />
      </DivStyle2>
      <GoogleLoginButton>구글 로그인</GoogleLoginButton>
      <JoinText>
        아직계정이 없으신가요? <Join>가입하기</Join>
      </JoinText>
    </Container>
  );
}

export default Login;

/* CSS */
const Container = styled.div`
  // display: inline-flex;
  // flex-flow: row-reverse wrap;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 700px;
  min-height: 600px;
  min-width: 1200px;
  border: solid 1px #dadada;
  border-radius: 10px;
  margin: 190px 389px;
  padding: 83px 253px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 20px;

  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  &:focus {
    border: none;
    outline: 1px solid rgba(75, 182, 209, 0.87);
  }
`;
const DivStyle = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
`;

const DivStyle2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoginButton = styled.button`
  font-size: 21px;
  font-weight: 600;
  margin-left: 43px;

  width: 174px;
  height: 145px;

  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  background-color: rgba(75, 182, 209, 0.87);
  border-radius: 10px;
`;
const GoogleLoginButton = styled.button`
  display: block;
  font-size: 21px;
  font-weight: 600;
  margin: 36px auto;
  width: 394px;
  height: 73px;

  cursor: pointer;
  color: #fff;
  border: none;
  background-color: rgba(75, 182, 209, 0.87);
  border-radius: 10px;
`;

const ForgotPwd = styled.div`
  font-size: 16px;
  text-align: right;
`;

const OrDiv = styled.div`
  text-align: center;
  margin: 0 20px;
`;

const JoinText = styled.div`
  text-align: center;
`;

const Join = styled.a`
  color: rgba(75, 182, 209, 0.87);
  text-decoration: none;
`;
