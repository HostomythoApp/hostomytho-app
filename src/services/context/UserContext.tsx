import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserPoints } from "services/api/user";
import { AchievementContext } from 'services/context/AchievementContext';
import { Achievement } from "models/Achievement";

interface User {
  id: number;
  username: string;
  points: number;
  status: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
  removeUser: () => Promise<void>;
  incrementPoints: (points: number) => void;
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
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const incrementPoints = async (points: number) => {
    if (user) {
      const newUser = { ...user, points: user.points + points };
      await storeUser(newUser);
      setUserState(newUser);

      // Mise à jour des points de l'utilisateur et récupération des nouvelles réalisations
      const response = await updateUserPoints(user.id, newUser.points);

      // Si il y a de nouvelles réalisations, on déclenche l'affichage du modal pour chacune d'entre elles
      if (response.data.newAchievements && response.data.newAchievements.length > 0) {
        response.data.newAchievements.forEach((achievement: Achievement) => {
          unlockAchievement(achievement);
        });
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, removeUser, incrementPoints }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };