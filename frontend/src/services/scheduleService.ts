import axios from 'axios';

const API_URL = 'http://localhost:5000/api/schedules'; // backend endpoint

export const getSchedules = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createSchedule = async (schedule: { date: string; time: string; employeeId: number }) => {
  const response = await axios.post(API_URL, schedule);
  return response.data;
};

export const updateSchedule = async (id: number, schedule: { date: string; time: string; employeeId: number }) => {
  const response = await axios.put(`${API_URL}/${id}`, schedule);
  return response.data;
};

export const deleteSchedule = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
