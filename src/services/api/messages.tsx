import { MessageContact } from "models/MessageContact";
import api from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokenIsExpired } from "utils/tokenUtils";

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
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.get("/messages/getMessages", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    throw error;
  }
};

export const deleteMessage = async (id: number) => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    await api.delete(`/messages/deleteMessage/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du message:", error);
    throw error;
  }
};

// **************** Message menu ********************
export const getMessageMenu = async (messageType: string) => {
  try {
    const response = await api.get(`/utils/messageMenu?messageType=${messageType}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMessagesMenu = async () => {

  try {
    const response = await api.get(`/messages/messagesMenu`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMessageMenuByType = async (messageType: string, messageMenu: any) => {

  try {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await api.put(`/messages/updateMessageMenu/type/${messageType}`, messageMenu, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du message de menu:", error);
    throw error;
  }
};

export const notifyAllUsers = async () => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.put(
      `/messages/notifyAllUsers`, 
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Impossible de notifier les utilisateurs.", error);
    throw error;
  }
};

