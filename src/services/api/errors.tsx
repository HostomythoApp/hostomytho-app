import { ErrorType } from "models/ErrorType";
import api from "./index";
import { UserErrorDetail } from "models/UserErrorDetail";
import { UserTypingErrors } from "models/UserTypingErrors";

export const sendResponse = async (data: {
  userErrorDetailId: number;
  selectedErrorType: number;
  isTutorial: boolean;
  isInvisibleTest: boolean;
  userId: number;
}): Promise<any> => {
  try {
    const response = await api.post("/errors/sendResponse", data);
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

export const getTypeByErrorId = async (id: number): Promise<ErrorType> => {
  try {
    const response = await api.get(`/errors/getTypeByErrorId/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du type de l'erreur :", error);
    throw error;
  }
};

export const isErrorTest = async (id: number): Promise<{ isTest: boolean }> => {
  try {
    const response = await api.get(`/errors/isErrorTest/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la vérification du statut de test de l'erreur :", error);
    throw error;
  }
};

export const createUserErrorDetail = async (userErrorDetail: Partial<UserErrorDetail>) => {
  try {
    const response = await api.post("/texts/createUserErrorDetail", userErrorDetail);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUserTypingError = async (userTypingErrors: Partial<UserTypingErrors>) => {
  try {
    const response = await api.post("/errors/createUserTypingError", userTypingErrors);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};