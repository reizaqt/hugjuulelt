import api from "./api";

export const getPaymentCategories = () => api.get("/payment-method");
export const createPaymentCategory = (data: { method_name: string }) =>
  api.post("/payment-method", data);
export const updatePaymentCategory = (id: number, data: { method_name: string }) =>
  api.put(`/payment-method/${id}`, data);
export const deletePaymentCategory = (id: number) => api.delete(`/payment-method/${id}`);
