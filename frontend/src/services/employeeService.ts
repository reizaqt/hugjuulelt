import api from "./api";

export const getEmployees = () => api.get("/employee");

export const createEmployee = (data: {
  emp_name: string;
  phone: string;
  email?: string;
  position_id: number;
}) => api.post("/employee", data);

export const deleteEmployee = (id: number) => api.delete(`/employee/${id}`);
