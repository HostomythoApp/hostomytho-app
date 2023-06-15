import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import api from "./index";

// TODO Créer le getall 

export const createUserSentenceSpecification = async (userSentenceSpecification: Partial<UserSentenceSpecification>) => {
  console.log("---- createUserSentenceSpecification --------");
  console.log(userSentenceSpecification);
  
  try {
    const response = await api.post("/userSentenceSpecifications", userSentenceSpecification);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
