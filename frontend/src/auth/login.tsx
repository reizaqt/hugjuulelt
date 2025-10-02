import { useState } from 'react';
import { login } from '../services/auth';

export const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(phone, password);
      console.log('Амжилттай нэвтэрлээ, role:', data.role);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Алдаа гарлаа');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Утас" value={phone} onChange={e => setPhone(e.target.value)} />
      <input type="password" placeholder="Нууц үг" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Нэвтрэх</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
};
