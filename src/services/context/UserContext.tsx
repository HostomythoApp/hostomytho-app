import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTailwind } from "tailwind-rn";
import { updateUserPoints, getUserById, updateUserCatchProbability, restartCatchProbability, updateUserStatsApi } from "services/api/user";
import { Achievement } from "models/Achievement";
import { User } from "models/User";
import ModalContext from "services/context/ModalContext";
import { View, Text, Image } from "react-native";
import AchievementIcon from "components/AchievementIcon";
import { getEquippedUserSkins, getRandomSkin } from "services/api/skins";
import { Skin } from "models/Skin";
import SkinImage from "components/SkinImage";

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
  removeUser: () => Promise<void>;
  incrementPoints: (points: number) => void;
  incrementCatchProbability: (percentageToAdd: number) => void;
  updateStorageUserFromAPI: (userId: number) => Promise<void>;
  resetCatchProbability: (userId: number) => Promise<void>;
  resetUserState: () => void;
  updateUserStats: (pointsToAdd: number, percentageToAdd: number) => void;
  equippedSkins: Skin[];
  setEquippedSkins: React.Dispatch<React.SetStateAction<Skin[]>>;
}
interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);
const useUser = () => useContext(UserContext);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const tw = useTailwind();
  const [user, setUserState] = useState<User | null>(null);
  const modalContext = useContext(ModalContext);
  const [equippedSkins, setEquippedSkins] = useState<Skin[]>([]);

  useEffect(() => {
    const fetchEquippedSkins = async () => {
      if (user?.id) {
        try {
          const skins = await getEquippedUserSkins(user.id);
          setEquippedSkins(skins);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchEquippedSkins();
  }, [user]);

  useEffect(() => {
    const loadStoredUser = async () => {
      const storedUser = await loadUser();
      setUserState(storedUser);
    };
    loadStoredUser();
  }, []);

  const setUser = async (updateFunction: any) => {
    setUserState(prevUser => {
      // Calculer le nouvel utilisateur en fonction de l'état précédent
      const newUser = typeof updateFunction === 'function' ? updateFunction(prevUser) : updateFunction;
      storeUser(newUser).catch(console.error);
      if (newUser) {
        getEquippedUserSkins(newUser.id)
          .then(skins => setEquippedSkins(skins))
          .catch(console.error);
      } else {
        setEquippedSkins([]);
      }
      return newUser;
    });
  };

  const storeUser = async (user: User | null) => {
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem("user");
    }
  };

  const loadUser = async (): Promise<User | null> => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  const removeUser = async () => {
    try {
      // TODO Problème là, le user n'est pas supprimé
      await AsyncStorage.clear();
      setEquippedSkins([]);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const unlockSkinModal = (skin: Skin) => {
    modalContext.setContent(
      <View style={tw('bg-white rounded-xl p-2 items-center')}>
        <Text style={tw('text-center text-green-700 font-bold text-lg')}>Nouvelle apparence débloquée</Text>
        <View style={tw('border-b border-gray-400 mt-4 w-full')} />
        <View style={tw('rounded-lg overflow-hidden h-16 mt-2')}>
          <SkinImage skin={skin} />
        </View>
      </View>
    );
    modalContext.showModal();
  };

  const unlockAchievementModal = async (achievement: Achievement) => {
    modalContext.setContent(
      <View style={tw('bg-white rounded-xl p-2')}>
        <Text style={tw('text-center text-green-600 font-bold text-lg')}>Haut fait débloqué</Text>

        <View style={tw('border-b border-gray-400 my-4')} />

        <View style={tw('flex-row items-center justify-center mb-1')}>
          <AchievementIcon achievement={achievement} />
          <Text style={tw('ml-3 text-lg font-bold')}>{achievement?.name}</Text>
        </View>
        <Text style={tw('text-center')}>{achievement?.description}</Text>
      </View>
    );
    modalContext.showModal();
  };

  const unlockPointsModal = () => {
    modalContext.setContent(
      <View style={tw('bg-white rounded-xl p-2')}>
        <Text style={tw('text-center text-green-600 font-bold text-lg font-primary')}>Points supplémentaires gagnés</Text>
        <View style={tw('border-b border-gray-400 my-4')} />
        <Text style={tw('text-center font-primary')}>Vous avez déjà débloqué tous les skins disponibles. En récompense, vous gagnez 5 points supplémentaires !</Text>
      </View>
    );
    modalContext.showModal();
  };

  const incrementPoints = async (pointsToAdd: number, isBonus: boolean = false) => {

    if (user) {
      const oldPoints = user.points;
      const response = await updateUserPoints(user.id, pointsToAdd);
      const newPoints = response.data.newPoints;

      setUser((prevUser: any) => ({ ...prevUser, points: response.data.newPoints }));
      // Gain de skin tous les 100 points
      const oldRewardTier = Math.floor(oldPoints / 100);
      const newRewardTier = Math.floor(newPoints / 100);

      if (newRewardTier > oldRewardTier) {
        try {
          const response = await getRandomSkin(user.id);

          if (response.allSkinsUnlocked) {
            unlockPointsModal();
            if (!isBonus) {
              incrementPoints(5, true);
            }
          } else {
            // Si c'est un nouveau skin, on affiche la modal pour le skin
            unlockSkinModal(response);
          }
        } catch (error) {
          console.error("Error getting random skin:", error);
        }
      }
      // Si il y a de nouvelles réalisations, on déclenche l'affichage du modal pour chacune d'entre elles
      if (response.data.newAchievements && response.data.newAchievements.length > 0) {
        response.data.newAchievements.forEach((achievement: Achievement) => {
          unlockAchievementModal(achievement);
        });
      }
    }
  };

  const incrementCatchProbability = async (percentageToAdd: number) => {
    if (user) {
      const response = await updateUserCatchProbability(user.id, percentageToAdd);
      setUser((prevUser: any) => ({ ...prevUser, catch_probability: response.data.newCatchProbability }));
    }
  };

  const updateUserStats = async (pointsToAdd: number, percentageToAdd: number, isBonus: boolean = false) => {
    if (user) {
      const oldPoints = user.points;

      try {
        const response = await updateUserStatsApi(user.id, percentageToAdd, pointsToAdd);
        const newPoints = response.data.newPoints;
        const newCatchProbability = response.data.newCatchProbability;

        setUser((prevUser: any) => ({
          ...prevUser,
          points: newPoints,
          catch_probability: newCatchProbability
        }));

        // Vérifiez si l'utilisateur a atteint un nouveau palier pour les skins
        const oldRewardTier = Math.floor(oldPoints / 100);
        const newRewardTier = Math.floor(newPoints / 100);

        if (newRewardTier > oldRewardTier) {
          try {
            const skinResponse = await getRandomSkin(user.id);

            if (skinResponse.allSkinsUnlocked) {
              unlockPointsModal();
              if (!isBonus) {
                updateUserStats(5, 0, true);
              }
            } else {
              unlockSkinModal(skinResponse);
            }
          } catch (error) {
            console.error("Error getting random skin:", error);
          }
        }

        // Afficher les nouvelles réalisations si elles existent
        if (response.data.newAchievements && response.data.newAchievements.length > 0) {
          response.data.newAchievements.forEach((achievement: Achievement) => {
            unlockAchievementModal(achievement);
          });
        }

      } catch (error) {
        console.error("Error updating user stats:", error);
      }
    }
  };



  const resetCatchProbability = async () => {
    if (user) {
      try {
        await restartCatchProbability(user.id);
        setUser({ ...user, catch_probability: 0 });
      } catch (error) {
        console.error('Erreur dans le reset de la probabilité:', error);
      }
    }
  };

  const updateStorageUserFromAPI = async (userId: number) => {
    if (userId) {
      try {
        const updatedUser = await getUserById(userId);
        setUser(updatedUser);
      } catch (error) {
        console.error('Failed to update user from API:', error);
      }
    }
  };

  const resetUserState = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, removeUser, incrementPoints, updateStorageUserFromAPI, resetUserState, incrementCatchProbability, resetCatchProbability, updateUserStats, equippedSkins, setEquippedSkins }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
