import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import api from "./index";

export const getNumberSpecifications = async (): Promise<number> => {
  try {
    return await api.get(`/userSentenceSpecifications/getNumberSpecifications`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUserSentenceSpecification = async (userSentenceSpecification: Partial<UserSentenceSpecification>) => {
  try {
    const response = await api.post("/userSentenceSpecifications", userSentenceSpecification);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};