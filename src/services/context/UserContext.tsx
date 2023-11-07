import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTailwind } from "tailwind-rn";
import { updateUserPoints, getUserById } from "services/api/user";
import { Achievement } from "models/Achievement";
import { User } from "models/User";
import ModalContext from "services/context/ModalContext";
import { View, Text } from "react-native";
import AchievementIcon from "components/AchievementIcon";

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
  removeUser: () => Promise<void>;
  incrementPoints: (points: number) => void;
  updateStorageUserFromAPI: (userId: number) => Promise<void>;
  resetUserState:  () => void;
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

  useEffect(() => {
  }, [user]);

  useEffect(() => {
    console.log("useUser");
    console.log(useUser);
    
    // TODO Les skins de l'user ne sont pas bien chargés quand déco ou reco. Vérifier les autres infos comme les points
    const loadStoredUser = async () => {
      const storedUser = await loadUser();
      setUserState(storedUser);
    };
    loadStoredUser();
  }, []);

  const setUser = async (newUser: User | null) => {
    setUserState(newUser);
    await storeUser(newUser);
  };

  const storeUser = async (user: User | null) => {
    console.log("storeUser");
    
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem("user");
    }
  };

  const loadUser = async (): Promise<User | null> => {
    console.log("loadUser");

    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  const removeUser = async () => {
    console.log("removeUser dans UserContext");

    try {
      // TODO Problème là, le user n'est pas supprimé
      // await AsyncStorage.removeItem("user");
      await AsyncStorage.clear(); 
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const incrementPoints = async (pointsToAdd: number) => {
    if (user) {
      const response = await updateUserPoints(user.id, pointsToAdd);

      setUser({ ...user, points: response.data.newPoints });

      // Si il y a de nouvelles réalisations, on déclenche l'affichage du modal pour chacune d'entre elles
      if (response.data.newAchievements && response.data.newAchievements.length > 0) {
        response.data.newAchievements.forEach((achievement: Achievement) => {
          unlockAchievementModal(achievement);
        });
      }
    }
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


  const updateStorageUserFromAPI = async (userId: number) => {
    if (userId) {
      try {
        const updatedUser = await getUserById(userId);
        // @ts-ignore
        setUser(updatedUser);
      } catch (error) {
        console.error('Failed to update user from API:', error);
      }
    }
  };

  const resetUserState = () => {
    console.log("resetUserState");
    
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, removeUser, incrementPoints, updateStorageUserFromAPI, resetUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
