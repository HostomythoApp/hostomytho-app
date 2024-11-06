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

// token user a mettre
export const getUserCriminals = async (userId: number): Promise<Criminal[] | undefined> => {
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

// token user a mettre
export const catchCriminal = async (userId: number): Promise<{ success: boolean; catchEntry?: any; error?: string }> => {
  try {
    const response = await api.post(`/criminals/catchCriminal`, {
      userId
    });

    if (response.status === 200) {
      return {
        success: true,
        catchEntry: response.data
      };
    } else {
      console.error(`Failed to catch next criminal for user ID: ${userId}, status code: ${response.status}`);
      return {
        success: false,
        error: `Failed to catch next criminal, status code: ${response.status}`
      };
    }
  } catch (error: any) {
    console.error('An error occurred while attempting to catch the next criminal:', error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
};
