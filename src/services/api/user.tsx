import { User } from "models/User";
import api from "./index";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get(`/users`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUpUser = async (user: Partial<User>) => {
  try {
    const defaultValues = {
      points: 0,
      trust_index: 0,
      theme: "default",
      notifications_enabled: true,
    };
    return await api.post("/users/signup", { ...defaultValues, ...user });
  } catch (error: any) {
    if (error.response && error.response.status !== 409) {
      console.error(error);
    }
    throw error;
  }
};

export const signInUser = async (username: string, password: string) => {
  try {
    return await api.post("/users/signin", {
      username,
      password,
    });
  } catch (error: any) {
    if (error.response && error.response.status !== 404 && error.response.status !== 401) {
      console.error(error);
    }
    throw error;
  }
};

export const getUserRankingRange = async (id: number): Promise<any> => {
  try {
    return await api.get(`/users/getUserRankingRange/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersOrderedByPoints = async (page: number): Promise<any> => {
  try {
    return await api.get(`/users/getUsersOrderedByPoints?page=${page}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserPoints = async (id: number, points: number) => {
  try {
    return await api.put(`/users/${id}/points`, {
      points,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserCatchProbability = async (id: number, catch_probability: number) => {
  try {
    return await api.put(`/users/${id}/catchProbability`, {
      catch_probability,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserStatsApi = async (id: number, catch_probability: number, points: number) => {
  try {
    return await api.put(`/users/${id}/updateUserStats`, {
      catch_probability,
      points
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const restartCatchProbability = async (id: number) => {
  try {
    return await api.put(`/users/${id}/resetCatchProbability`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
