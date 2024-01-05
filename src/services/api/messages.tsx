import { MessageContact } from "models/MessageContact";
import api from "./index";

export const createMessageContact = async (messageContact: Partial<MessageContact>) => {
    try {
      const response = await api.post("/messages/contactMessage", messageContact);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du message de contact:", error);
      throw error;
    }
};
