// import { Achievement } from "models/Achievement";
// import { User } from "models/User";

// import api from "./index";

// // TODO mettre des try catch


// export const getAllAchievements = async (): Promise<Achievement[]> => {
//   const response = await api.get('/achievements');
//   return response.data;
// };

// export const getUserAchievements = async (userId: number): Promise<Achievement[]> => {
//   const response = await api.get(`/achievements/byUserId/${userId}`);
//   return response.data;
// };

// export const getAchievementsWithUserStatus = async (userId: number): Promise<Achievement[]> => {
//   const allAchievements = await getAllAchievements();
//   const userAchievements = await getUserAchievements(userId);

//   const achievementsWithUserStatus = allAchievements.map((achievement: Achievement) => {
//     const userHasAchievement = userAchievements.some((ua: Achievement) => ua.id === achievement.id);
//     return { ...achievement, userHasAchievement };
//   });

//   return achievementsWithUserStatus;
// };

