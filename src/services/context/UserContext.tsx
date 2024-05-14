import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTailwind } from "tailwind-rn";
import { getUserById, updateUserCatchProbability, restartCatchProbability, updateUserStatsApi, updateTutorialProgress } from "services/api/user";
import { Achievement } from "models/Achievement";
import { User } from "models/User";
import ModalContext from "services/context/ModalContext";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AchievementIcon from "components/AchievementIcon";
import { getEquippedUserSkins, getRandomSkin } from "services/api/skins";
import { Skin } from "models/Skin";
import SkinImage from "components/SkinImage";
import { completeTutorialForUser, getCompletedTutorials } from "services/api/games";
import { getRarityColor, rarityLevel } from "utils/functions";

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
  removeUser: () => Promise<void>;
  incrementCatchProbability: (percentageToAdd: number) => void;
  updateStorageUserFromAPI: (userId: number) => Promise<void>;
  resetCatchProbability: (userId: number) => Promise<void>;
  incrementTutorialProgress: () => void;
  resetUserState: () => void;
  updateUserStats: (pointsToAdd: number, percentageToAdd: number, trustIndexIncrement: number) => void;
  equippedSkins: Skin[];
  setEquippedSkins: React.Dispatch<React.SetStateAction<Skin[]>>;
  unlockAchievementModal: (achievement: Achievement) => Promise<void>;
  tutorialsCompleted: Record<string, boolean>;
  fetchTutorialsCompleted: () => Promise<void>;
  completeTutorial: (gameId: number, tutorialName: string) => Promise<void>;
  resetTutorialsCompleted: () => void;
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
  const [tutorialsCompleted, setTutorialsCompleted] = useState<Record<string, boolean>>({});

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
      await AsyncStorage.clear();
      setEquippedSkins([]);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  // Gestion des tutorials
  const completeTutorial = useCallback(async (gameId: number, tutorialName: string) => {
    if (user) {
      try {
        await completeTutorialForUser(user.id, gameId);
        setTutorialsCompleted(prev => ({
          ...prev,
          [tutorialName]: true
        }));
      } catch (error) {
        console.error('Error completing tutorial', error);
      }
    }
  }, [user]);

  const fetchTutorialsCompleted = useCallback(async () => {
    if (user) {
      try {
        const games = await getCompletedTutorials(user.id);
        const tutorialsState = games.reduce((acc, game) => {
          acc[game.name] = true;
          return acc;
        }, {} as Record<string, boolean>);
        setTutorialsCompleted(tutorialsState);
      } catch (error) {
        console.error('Error fetching tutorials', error);
      }
    }
  }, [user]);

  const resetTutorialsCompleted = useCallback(() => {
    setTutorialsCompleted({});
  }, []);


  useEffect(() => {
    if (user) {
      fetchTutorialsCompleted();
    }
  }, [user, fetchTutorialsCompleted]);

  const unlockSkinModal = (skin: Skin) => {
    const rarityColor = getRarityColor(skin.rarity);

    modalContext.setContent(
      <View style={tw('bg-white rounded-xl p-4 items-center')}>
        <Text style={tw('text-center font-primary font-bold text-lg')}>Nouvelle apparence débloquée</Text>
        <View style={tw('border-b border-gray-400 mt-4 w-full')} />
        <View style={[tw('rounded-lg overflow-hidden h-16 mt-2'), { borderColor: rarityColor, borderWidth: 2 }]}>
          <SkinImage skin={skin} />
        </View>
        <Text style={[tw('text-center mt-2 font-primary'), { color: rarityColor }]}>
          Rareté: {rarityLevel(skin.rarity)}
        </Text>
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
        <Text style={tw('text-center font-primary')}>Vous avez déjà débloqué tous les skins disponibles. En récompense, tous les 100 points, vous gagnez 5 points supplémentaires.</Text>
      </View>
    );
    modalContext.showModal();
  };


  const incrementCatchProbability = async (percentageToAdd: number) => {
    if (user) {
      const response = await updateUserCatchProbability(user.id, percentageToAdd);
      setUser((prevUser: any) => ({ ...prevUser, catch_probability: response.data.newCatchProbability }));
    }
  };

  const incrementTutorialProgress = async () => {
    if (user) {
      const response = await updateTutorialProgress(user.id);
      setUser((prevUser: User) => ({ ...prevUser, tutorial_progress: response.data.newTutorialProgress }));
    }
  };

  const updateUserStats = async (pointsToAdd: number, percentageToAdd: number, trustIndexIncrement: number, isBonus: boolean = false) => {

    if (user) {
      const oldPoints = user.points;

      try {
        let coeffTrustIndex = user.trust_index / 80;
        coeffTrustIndex = Math.max(coeffTrustIndex, 0);
        const additionalPoints = Math.round(pointsToAdd * coeffTrustIndex * user.coeffMulti);
        user.points += additionalPoints;

        const response = await updateUserStatsApi(user.id, percentageToAdd, additionalPoints, trustIndexIncrement);
        const newPoints = response.data.newPoints;
        const newCatchProbability = response.data.newCatchProbability;
        const newTrustIndex = response.data.newTrustIndex;
        const newCoeffMulti = response.data.newCoeffMulti;

        // Mettre à jour l'état de l'utilisateur
        setUser((prevUser: any) => ({
          ...prevUser,
          points: newPoints,
          catch_probability: newCatchProbability,
          trust_index: newTrustIndex,
          coeffMulti: newCoeffMulti
        }));

        let shouldDelaySkinModal = false;

        // Affiche les nouvelles réalisations si elles existent
        if (response.data.newAchievements && response.data.newAchievements.length > 0) {
          response.data.newAchievements.forEach((achievement: Achievement) => {
            unlockAchievementModal(achievement);
          });
          shouldDelaySkinModal = true; // Retarde l'affichage de la modal des skins si des hauts faits sont affichés
        }

        // Vérifiez si l'utilisateur a atteint un nouveau palier pour les skins
        const oldRewardTier = Math.floor(oldPoints / 100);
        const newRewardTier = Math.floor(newPoints / 100);

        if (newRewardTier > oldRewardTier) {
          const skinResponse = await getRandomSkin(user.id);

          if (skinResponse.allSkinsUnlocked) {
            if (shouldDelaySkinModal) {
              setTimeout(() => {
                unlockPointsModal();
              }, 6000);
            } else {
              unlockPointsModal();

            }

            if (!isBonus) {
              updateUserStats(5, 0, 0, true);
            }
          } else if (shouldDelaySkinModal) {
            setTimeout(() => {
              unlockSkinModal(skinResponse);
            }, 6000);
          } else {
            unlockSkinModal(skinResponse);
          }
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
    <UserContext.Provider value={{ user, setUser, removeUser, updateStorageUserFromAPI, resetUserState, incrementCatchProbability, resetCatchProbability, incrementTutorialProgress, updateUserStats, equippedSkins, setEquippedSkins, unlockAchievementModal, tutorialsCompleted, fetchTutorialsCompleted, completeTutorial, resetTutorialsCompleted }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
