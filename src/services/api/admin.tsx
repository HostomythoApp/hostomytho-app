import { Admin } from "models/Admin";
import api from "./index";
// TODO mettre des try catch

export const getAdmins = async (): Promise<Admin[]> => {
  return await api.get("/admins");
};

export const getAdminById = async (id: number): Promise<Admin[]> => {
  return await api.get(`/admins/${id}`);
};

export const signUpAdmin = async (admin: Admin) => {

  return await api.post("/admins/signup", { admin });
};

export const signInAdmin = async (username: string, password: string) => {
  return await api.post("/admins/signin", {
    username,
    password,
  });
};

export const updateAdmin = async (id: number, points: number) => {
  return await api.put(`/admins/${id}`, {
    points,
  });
};
