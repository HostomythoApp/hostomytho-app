import { Theme } from "models/Theme";
import api from "./index";

// Inutile pour le moment
export const getAllThemes = async (): Promise<Theme[] | any> => {
  try {
    const response = await api.get("/themes");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
