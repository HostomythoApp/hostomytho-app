import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUser } from "services/api/user";

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
      updateUser(user.id, newUser.points);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, removeUser, incrementPoints }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };