import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = async (phone: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { phone, password });
  localStorage.setItem('token', res.data.token); // JWT хадгалах
  return res.data;
};

export const getToken = () => localStorage.getItem('token');
export const logout = () => localStorage.removeItem('token');
