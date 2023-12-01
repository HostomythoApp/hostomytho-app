import { Game } from "models/Game";

import api from "./index";

export const isTutorialCompleted = async (userId: number, gameId: number): Promise<boolean> => {
  try {
    const response = await api.get(`/games/tutorialCompleted/${userId}/${gameId}`);
    return response.data.completed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCompletedTutorials = async (userId: number): Promise<Game[]> => {
  try { 
    const response = await api.get(`/games/tutorialsCompleted/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const completeTutorialForUser = async (userId: number, gameId: number): Promise<void> => {
  try {
    const response = await api.post("/games/completeTutorial", {
      userId,
      gameId
    });

    if (response.status !== 200) {
      throw new Error('Failed to mark tutorial as completed.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};