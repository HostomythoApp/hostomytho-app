import api from "./index";

export const getUsers = async () => {
  return await api.get("/users");
};

export const getUserById = async (id: number) => {
  return await api.get(`/users/${id}`);
};
