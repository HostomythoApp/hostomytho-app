import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshToken } from "services/api/utils";
import { setAuthToken } from "services/api";

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
  resetAuthState: any;
  renewAccessToken: (token: string) => Promise<string>;
  getRefreshToken: () => Promise<string>;
  removeRefreshToken: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}
const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
  isLoading: true,
};
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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
      setAuthToken(token);
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

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem("@auth_token");
    } catch (error) {
      console.error("Error getting the token:", error);
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

  useEffect(() => {
    checkToken();
  }, []);

  const renewAccessToken = async (token: string): Promise<string | null> => {
    try {
      const response = await refreshToken(token);
      if (response && response.accessToken) {
        await storeToken(response.accessToken);
        return response.accessToken;
      }
      throw new Error("Access token is missing in the response");
    } catch (error) {
      console.error("Error renewing access token:", error);
      await removeToken();
      return null;
    }
  };

  const resetAuthState = () => {
    setAuthState(initialAuthState);
  };



  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        storeToken,
        removeToken,
        resetAuthState,
        // @ts-ignore
        renewAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
