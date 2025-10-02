// frontend/src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(phone, password);
      console.log('Амжилттай нэвтэрлээ:', data);
      navigate('/home');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Сервер алдаа');
    }
  };

  return (
    <div>
      <h2>Нэвтрэх</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Утас" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Нууц үг" required />
        <button type="submit">Нэвтрэх</button>
      </form>
    </div>
  );
};

export default Login;
