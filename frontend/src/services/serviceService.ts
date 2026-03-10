import api from "./api";

export const getServices = () => api.get("/services");

export const createService = (data: { service_name: string; service_desc?: string; sc_id: number }) =>
  api.post("/services", data);

export const updateService = (id: number, data: { service_name: string; service_desc?: string; sc_id: number }) =>
  api.put(`/services/${id}`, data);

export const deleteService = (id: number) => api.delete(`/services/${id}`);
