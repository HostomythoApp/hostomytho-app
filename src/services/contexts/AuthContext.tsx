import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

interface AuthContextProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  storeToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("@auth_token", token);
      setAuthState({ isAuthenticated: true, token });
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("@auth_token");
      setAuthState({ isAuthenticated: false, token: null });
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        storeToken,
        removeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
