import api from "./api";

export const getServiceCategories = () => api.get("/service-category");
export const createServiceCategory = (data: { sc_name: string; sc_desc?: string }) =>
  api.post("/service-category", data);
export const updateServiceCategory = (id: number, data: { sc_name: string; sc_desc?: string }) =>
  api.put(`/service-category/${id}`, data);
export const deleteServiceCategory = (id: number) =>
  api.delete(`/service-category/${id}`);