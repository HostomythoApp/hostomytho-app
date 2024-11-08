import { Achievement } from "models/Achievement";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "./index";

export const getAllAchievements = async (): Promise<Achievement[]> => {
  try {
    const response = await api.get('/achievements');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserAchievements = async (userId: number): Promise<Achievement[]> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");

    const response = await api.get(`/achievements/byUserId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAchievementsWithUserStatus = async (userId: number): Promise<Achievement[]> => {
  try {
    const allAchievements = await getAllAchievements();
    const userAchievements = await getUserAchievements(userId);

    const achievementsWithUserStatus = allAchievements.map((achievement: Achievement) => {
      const userHasAchievement = userAchievements.some((ua: Achievement) => ua.id === achievement.id);
      return { ...achievement, userHasAchievement };
    });

    return achievementsWithUserStatus;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
