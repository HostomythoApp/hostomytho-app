import { ErrorType } from "models/ErrorType";
import api from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendResponse = async (data: {
  userErrorDetailId: number;
  selectedErrorType: number;
  userId: number;
}): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.post("/errors/sendResponse", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la réponse :", error);
    throw error;
  }
};

export const getTypesError = async (): Promise<ErrorType[] | any> => {
  try {
    const response = await api.get("/errors/getTypesError");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des types d'erreurs :", error);
    throw error;
  }
};


// export const createUserErrorDetail = async (userErrorDetail: Partial<UserErrorDetail>) => {
//   try {
//     const response = await api.post("/texts/createUserErrorDetail", userErrorDetail);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
