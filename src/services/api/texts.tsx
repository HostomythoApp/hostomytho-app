import { Text } from "models/Text";
import api from "./index";

export const getAllTexts = async (): Promise<Text[]> => {
  console.log("function getAllText");
  
  try {
    console.log(await api.get("/texts"));
    
    return await api.get("/texts");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTextById = async (id: number): Promise<Text[]> => {
  try {
    return await api.get(`/texts/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTextsByTheme = async (theme: string): Promise<Text[]> => {
  try {
    return await api.get(`/texts/theme/${theme}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createText = async (text: Partial<Text>) => {
  try {
    return await api.post("/texts", text);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateText = async (id: number, text: Partial<Text>) => {
  try {
    return await api.put(`/texts/${id}`, text);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteText = async (id: number) => {
  try {
    return await api.delete(`/texts/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTextsByOrigin = async (origin: string): Promise<Text[]> => {
  try {
    return await api.get(`/texts/origin/${origin}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};