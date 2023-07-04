import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import api from "./index";

export const sendMail = async (mail: string) => {
  try {
    const response = await api.post("/sendMail", { mail });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
