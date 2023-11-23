import { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { googleLogin } from '../../utils/googleLogin';

const GoogleLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 렌더러 프로세스에서
  const handleLogin = async () => {
    // const result = await ipcRenderer.invoke('google-login', email, password);
    const result = window.electron.ipcRenderer.send('google-login', email, password);
    // window.electron.ipcRenderer.send('capture-request', searchQuery);
    // window.electron.ipcRenderer.send('capture-request', searchQuery);
    console.log(result);
  };


  // const handleLogin = () => {
  //   googleLogin(email, password)
  //     .then(() => {
  //       console.log('로그인 성공');
  //     })
  //     .catch((error) => {
  //       console.error('로그인 실패:', error);
  //     });
  // };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Google 로그인
        </Typography>
        <form style={{ width: '100%', marginTop: 1 }} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0px 16px' }}
            onClick={handleLogin}
          >
            로그인
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default GoogleLoginPage;
