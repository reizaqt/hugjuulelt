import api from "./api";

export const getStatusCategories = () => api.get("/status-category");
export const createStatusCategory = (data: { status_name: string }) =>
  api.post("/status-category", data);
export const updateStatusCategory = (id: number, data: { status_name: string }) =>
  api.put(`/status-category/${id}`, data);
export const deleteStatusCategory = (id: number) => api.delete(`/status-category/${id}`);
