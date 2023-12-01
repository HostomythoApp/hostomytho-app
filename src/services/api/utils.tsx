import { MessageMenu } from "models/MessageMenu";
import api from "./index";

export const sendMail = async (mail: string) => {
  try {
    const response = await api.post("/utils/sendMail", { mail });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMessageMenu = async () => {
  try {
    const response = await api.get("/utils/messageMenu");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changeMessageMenu = async (messageMenu: MessageMenu) => {
  try {
    const response = await api.put("/utils/messageMenu", messageMenu);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};