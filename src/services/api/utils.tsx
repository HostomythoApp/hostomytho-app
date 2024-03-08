import { MessageMenu } from "models/MessageMenu";
import api from "./index";

export const requestReset = async (email: string) => {
  try {
    const response = await api.post("/utils/requestReset", { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const getMessageMenu = async (messageType: string) => {
  try {
    const response = await api.get(`/utils/messageMenu/${messageType}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// http://localhost:3001/utils/messageMenu?messageType=home_connected
export const changeMessageMenu = async (messageMenu: MessageMenu) => {
  try {
    const response = await api.put("/utils/messageMenu", messageMenu);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const tokenValidation = async (token: string): Promise<any> => {
  try {
    return await api.get(`/utils/tokenValidation/${token}`);
  } catch (error) {
    throw error;
  }
};  

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    return await api.post(`/utils/resetPassword`, {
      token,
      newPassword
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
