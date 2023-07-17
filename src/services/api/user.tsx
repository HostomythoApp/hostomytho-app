import { User } from "models/User";
import api from "./index";
import { log } from "react-native-reanimated";
// TODO mettre des try catch

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get(`/users`);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
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

export const updateUserPoints = async (id: number, points: number) => {
  return await api.put(`/users/${id}/points`, {
    points,
  });
};

// Récupération du rang de l'utilisateur et des joueurs les plus proches de lui au score
export const getUserRankingRange = async (id: number): Promise<any> => {
  return await api.get(`/users/getUserRankingRange/${id}`);
};

export const getUsersOrderedByPoints = async (page: number): Promise<any> => {
  return await api.get(`/users/getUsersOrderedByPoints?page=${page}`);
};