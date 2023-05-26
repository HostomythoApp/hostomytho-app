import { Text } from "models/Text";
import api from "./index";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

export const getAllTexts = async (): Promise<Text[]> => {
  try {
    const response = await api.get(`/texts`);
    return response.data;
  } catch (error) {
    console.error(error);
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