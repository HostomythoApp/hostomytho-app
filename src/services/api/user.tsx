import { User } from "models/User";
import api from "./index";

export const getUsers = async (): Promise<User[]> => {
  return await api.get("/users");
};

export const getUserById = async (id: number): Promise<User[]> => {
  return await api.get(`/users/${id}`);
};

export const signUpUser = async (user: Partial<User>) => {
  const defaultValues = {
    points: 0,
    trust_index: 0,
    theme: "default",
    notifications_enabled: true,
  };
  return await api.post("/users/signup", { ...defaultValues, ...user });
};

export const signInUser = async (username: string, password: string) => {
  return await api.post("/users/signin", {
    username,
    password,
  });
};

export const updateUser = async (id: number, points: number) => {
  return await api.put(`/users/${id}`, {
    points,
  });
};
