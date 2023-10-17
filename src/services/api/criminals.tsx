import { Criminal } from "models/Criminals";

import api from "./index";

export const getCriminalById = async (id: number): Promise<Criminal | null> => {
  try {
    const response = await api.get(`/criminals/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Failed to fetch criminal with ID: ${id}, status code: ${response.status}`);
      return null;
    }
  } catch (error: any) {
    console.error('An error occurred while fetching the criminal:', error.toString());

    return null;
  }
};

export const getUserCriminals = async (userId: number): Promise<Criminal[]> => {
  try {
    const response = await api.get(`/criminals/caughtByUserId/${userId}`);

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      console.error(`Pas de criminels trouvés, status code: ${response.status}`);
    } else {
      console.error(`Failed to fetch criminals for user ID: ${userId}, status code: ${response.status}`);
      return [];
    }
  } catch (error: any) {
    console.error('An error occurred while fetching the criminals:', error.toString());
    return [];
  }
};
