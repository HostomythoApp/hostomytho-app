import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: number;
  username: string;
  points: number;
  status: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
  removeUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);
const useUser = () => useContext(UserContext);

const UserProvider: React.FC = ({ children }) => {
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

  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };