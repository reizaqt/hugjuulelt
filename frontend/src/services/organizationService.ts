import api from "./api";

export const getOrganizations = async () => {
  const res = await api.get("/organizations");
  return res.data;
};

export const createOrganization = async (data: { org_name: string; org_address: string; email: string; phone: string }) => {
  const res = await api.post("/organizations", data);
  return res.data;
};

export const updateOrganization = async (id: number, data: { org_name: string; org_address: string; email: string; phone: string }) => {
  const res = await api.put(`/organizations/${id}`, data);
  return res.data;
};

export const deleteOrganization = async (id: number) => {
  await api.delete(`/organizations/${id}`);
};
