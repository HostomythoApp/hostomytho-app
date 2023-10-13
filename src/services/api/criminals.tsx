import { Criminal } from "models/Criminals";

import api from "./index";

export const getCriminalById = async (id: number): Promise<Criminal> => {
  try {
    const response = await api.get(`/criminals/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserCriminals = async (userId: number): Promise<Criminal[]> => {
  try {
    const response = await api.get(`/criminals/caughtByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
