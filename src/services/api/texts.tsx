import { Text } from "models/Text";
import api from "./index";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

export const getAllTexts = async (): Promise<Text[]> => {
  try {
    const response = await api.get(`/texts`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error('Config:', error.config);
    
    throw error;
  }
};

export const getTextById = async (id: number): Promise<Text[]> => {
  try {
    const response = await api.get(`/texts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTextsByTheme = async (theme: string): Promise<Text[]> => {
  try {
    const response = await api.get(`/texts/theme/${theme}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createText = async (text: Partial<Text>) => {
  try {
    const response = await api.post("/texts", text);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateText = async (updatedText: { text: Partial<Text> }) => {
  const { text } = updatedText;
  try {
    const response = await api.put(`/texts/${text.id}`, text);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteText = async (id: number) => {
  try {
    const response = await api.delete(`/texts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTextsByOrigin = async (origin: string): Promise<Text[]> => {
  try {
    const response = await api.get(`/texts/origin/${origin}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};