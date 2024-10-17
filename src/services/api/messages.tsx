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

export const getMessages = async () => {
  try {
    const response = await api.get("/messages/getMessages");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    throw error;
  }
};

export const deleteMessage = async (id: number) => {
  try {
    await api.delete(`/messages/deleteMessage/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du message:", error);
    throw error;
  }
};