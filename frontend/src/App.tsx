import './App.css';
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home-page/HomePage'
import { LoginPage } from './pages/login-page/LoginPage'
import { RegisterPage } from './pages/register-page/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
