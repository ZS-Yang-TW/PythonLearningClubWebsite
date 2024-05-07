import { FC, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { UserRegisterData, createUser } from '../../apis/users.api';
import { useNavigate } from 'react-router-dom';

export const RegisterPage: FC = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 防止表單提交導致頁面刷新
    const { username, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert('密碼和確認密碼不匹配');
      return;
    }
    try {
      const userData: UserRegisterData = { username, email, password };
      await createUser(userData);
      alert('註冊成功');
      navigate('/');
    } catch (error) {
      console.error('註冊失敗', error);
      alert('註冊過程中出現錯誤');
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
        <Typography component="h1" variant="h5">
          註冊新帳戶
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleRegister}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="帳號"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="電子郵件地址"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="密碼"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="確認密碼"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            註冊
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
