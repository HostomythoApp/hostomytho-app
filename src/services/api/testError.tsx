import { UserErrorDetail } from "models/UserErrorDetail";
import api from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getErrorTestsByTextId = async (textId: number): Promise<UserErr[]> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.get(`/testError/byTextId/${textId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des erreurs de tests par texte :", error);
    throw error;
  }
};


export const getErrorTestById = async (errorId: number): Promise<UserErrorDetail> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.get(`/testError/${errorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'erreur:", error);
    throw error;
  }
};

export const getAllErrorTests = async (): Promise<any[]> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.get(`/testError`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de toutes les erreurs de tests :", error);
    throw error;
  }
};

export const createErrorTest = async (errorTest: any): Promise<any> => {
  try {
    console.log("createErrorTest");
    console.log(errorTest);

    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.post(`/testError`, errorTest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création d'une erreur de test :", error);
    throw error;
  }
};

export const updateErrorTestById = async (errorId: number, updatedFields: any): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.put(`/testError/${errorId}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'erreur de test :", error);
    throw error;
  }
};

export const deleteErrorTestById = async (errorId: number): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    await api.delete(`/testError/${errorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'erreur de test :", error);
    throw error;
  }
};
