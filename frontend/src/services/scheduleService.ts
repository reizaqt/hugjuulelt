import api from "./api";

export const getSchedules = () => api.get("/schedule");

export const createSchedule = (data: {
  emp_id: number;
  service_id: number;
  service_price: number;
  start_time: string;
  duration: number;
  notes?: string;
}) => api.post("/schedule", data);

export const deleteSchedule = (id: number) => api.delete(`/schedule/${id}`);
