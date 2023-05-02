import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  storeToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
  logout: () => Promise<void>;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
  isLoading: true,
};
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      if (token) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          token,
          isLoading: false,
        }));
      } else {
        setAuthState((prevState) => ({ ...prevState, isLoading: false }));
      }
    } catch (error) {
      console.error("Error checking token:", error);
      setAuthState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("@auth_token", token);
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        token,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error storing token:", error);
      setAuthState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };
  
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("@auth_token");
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: false,
        token: null,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error removing token:", error);
      setAuthState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };
  const logout = async () => {
    try {
      await removeToken();
    } catch (error) {
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        storeToken,
        removeToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };