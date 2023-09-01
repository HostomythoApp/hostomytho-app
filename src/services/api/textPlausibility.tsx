import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import api from "./index";

// TODO Créer le getall 

export const getTestErrorsByTextId = async (userSentenceSpecification: Partial<UserSentenceSpecification>) => {
  try {
    const response = await api.post("/userSentenceSpecifications", userSentenceSpecification);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
