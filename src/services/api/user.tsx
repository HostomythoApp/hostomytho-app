import { User } from "models/User";
import api from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";

// token a mettre et bien vérifier si marche bien à la co
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
      message_read: false,
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

// Verif token admin et user
export const deleteUser = async (id: number): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
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

// export const getCoeffMultiByUserId = async (id: number): Promise<number> => {
//   try {
//     return await api.get(`/users/getCoeffMultiByUserId/${id}`);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const getMessageReadByUserId = async (id: number): Promise<any> => {
  try {
    const response = await api.get(`/users/getMessageReadByUserId/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// token a mettre
export const updateMessageReadByUserId = async (id: number, readStatus: boolean) => {
  try {
    return await api.put(`/users/updateMessageReadByUserId/${id}`, {
      readStatus,
    });
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

// export const updateUserCatchProbability = async (id: number, catch_probability: number) => {
//   try {
//     return await api.put(`/users/${id}/catchProbability`, {
//       catch_probability,
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// token a mettre
export const updateTutorialProgress = async (id: number) => {
  try {
    return await api.put(`/users/${id}/incrementTutorialProgress`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserEmail = async (email: string) => {
  const token = await AsyncStorage.getItem("@auth_token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    return await api.put(`/users/updateUserEmail`, { email }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error updating user email:", error);
    throw error;
  }
};

// token user a mettre
export const restartCatchProbability = async (id: number) => {
  try {
    return await api.put(`/users/${id}/resetCatchProbability`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Admin
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editUser = async (id: number, data: any): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.put(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
