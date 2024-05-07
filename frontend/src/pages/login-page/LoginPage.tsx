import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userLogin, UserLoginData } from '../../apis/users.api';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // 防止表单提交导致页面刷新
        try {
            const userData: UserLoginData = { username, password };
            const response = await userLogin(userData);
            console.log('Login success:', response);
            navigate('/');
        } catch (error: any) {
            console.error('Login error:', error.message);
        }
    };


    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            會員登入
          </Typography>
          
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="帳號"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              size='small'
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              size='small'
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            >登录
            </Button>
          </Box>

          <Grid container justifyContent={'start'}>
            <Grid item xs>
              <Link href="#" variant="body2">
                忘記密碼？
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register/" variant="body2">
                {'註冊'}
              </Link>
            </Grid>
          </Grid>

        </Box>
      </Container>
    );
}