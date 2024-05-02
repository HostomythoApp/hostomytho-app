import { User } from "models/User";
import api from "./index";

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
      trust_index: 50,
      theme: "default",
      notifications_enabled: true,
      consecutiveDaysPlayed: 1,
      coeffMulti: 1,
      email: user.email && user.email.trim() !== '' ? user.email.trim() : null
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

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error: any) {
    console.error("Erreur dans la suppression du compte: ", error);
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

// Classement mensuel
export const getUserRankingRangeInMonthly = async (id: number): Promise<any> => {
  try {
    return await api.get(`/users/getUserRankingRangeInMonthly/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersOrderedByPointsInMonthly = async (page: number): Promise<any> => {
  try {
    return await api.get(`/users/getUsersOrderedByPointsInMonthly?page=${page}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTopMonthlyWinners = async (): Promise<any> => {
  try {
    return await api.get(`/users/getTopMonthlyWinners`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCoeffMultiByUserId = async (id: number): Promise<number> => {
  try {
    return await api.get(`/users/getCoeffMultiByUserId/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserDetailsById = async (id: number): Promise<any> => {
  try {
    return await api.get(`/users/getUserDetailsById/${id}`);
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

export const updateTutorialProgress = async (id: number) => {
  try {
    return await api.put(`/users/${id}/incrementTutorialProgress`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTrustIndex = async (id: number, trust_index: number) => {
  try {
    return await api.put(`/users/${id}/trustIndex`, {
      trust_index,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserStatsApi = async (id: number, catch_probability: number, points: number, trust_index: number) => {
  try {
    return await api.put(`/users/${id}/updateUserStats`, {
      catch_probability,
      points,
      trust_index
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserEmail = async (id: number, email: string) => {
  try {
    return await api.put(`/users/${id}/updateUserEmail`, {
      email,
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
