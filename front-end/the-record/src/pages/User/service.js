const fetchLogin = async ({ id, password }) => {
  const data = { userId: id, userPassword: password };
  return fetch('http://k6204.p.ssafy.io:8080/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async res => {
    const loginStatus = res.status;
    const JWT = await res.text();
    if (loginStatus === 200) return JWT;
    throw new Error('아이디와 비밀번호를 확인해주세요.');
  });
};

export default { fetchLogin };
