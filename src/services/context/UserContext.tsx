import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserPoints, getUserById } from "services/api/user";
import { AchievementContext } from 'services/context/AchievementContext';
import { Achievement } from "models/Achievement";

interface User {
  id: number;
  username: string;
  points: number;
  status: string;
  email: string;
  gender: string;
  color_skin: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
  removeUser: () => Promise<void>;
  incrementPoints: (points: number) => void;
  updateStorageUserFromAPI: (userId: number) => Promise<void>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);
const useUser = () => useContext(UserContext);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const { unlockAchievement } = useContext(AchievementContext);

  useEffect(() => {
  }, [user]);

  useEffect(() => {
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
      await AsyncStorage.removeItem("user");
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
          unlockAchievement(achievement);
        });
      }
    }
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


  return (
    <UserContext.Provider value={{ user, setUser, removeUser, incrementPoints, updateStorageUserFromAPI }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
