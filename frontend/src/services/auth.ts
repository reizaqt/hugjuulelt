import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = async (phone: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { phone, password });
  localStorage.setItem('token', res.data.token); 
  localStorage.setItem('role', res.data.role); 
  return res.data;
};

export const getToken = () => localStorage.getItem('token');

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
