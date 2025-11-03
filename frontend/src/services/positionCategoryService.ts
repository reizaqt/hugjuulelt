import api from "./api";

export const getPositionCategories = () => api.get("/position-category");
export const createPositionCategory = (data: { position_name: string }) =>
  api.post("/position-category", data);
export const updatePositionCategory = (id: number, data: { position_name: string }) =>
  api.put(`/position-category/${id}`, data);
export const deletePositionCategory = (id: number) => api.delete(`/position-category/${id}`);
