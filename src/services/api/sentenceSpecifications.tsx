import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import api from "./index";
import { TextWithTokens } from "interfaces/TextWithTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendResponse = async (data: {
  textId: number;
  userSentenceSpecifications: UserSentenceSpecification[];
  responseNum: number,
}): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.post("/sentenceSpecifications/sendResponse", data, {
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


export const getSentenceSpecificationsText = async (): Promise<TextWithTokens> => {
  try {
    const response = await api.get(`/sentenceSpecifications/getText`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Inutilisé
export const createUserSentenceSpecification = async (userSentenceSpecification: Partial<UserSentenceSpecification>) => {
  try {
    const response = await api.post("/sentenceSpecifications", userSentenceSpecification);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};