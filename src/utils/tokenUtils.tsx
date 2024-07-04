import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import CryptoJS from 'crypto-js';

// TODO A mettre dans un fichier env
const SECRET_KEY = 'your_secret_key_here';

export const storeRefreshToken = async (refreshToken: string) => {
    try {
        const encryptedToken = CryptoJS.AES.encrypt(refreshToken, SECRET_KEY).toString();
        await AsyncStorage.setItem('@refresh_token', encryptedToken);
        console.log("Refresh token stored successfully.");
    } catch (error) {
        console.error('Failed to store the refresh token:', error);
    }
};

export const getRefreshToken = async (): Promise<string | null> => {
    try {
        const encryptedToken = await AsyncStorage.getItem('@refresh_token');
        if (encryptedToken) {
            const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
            return bytes.toString(CryptoJS.enc.Utf8);
        }
        return null;
    } catch (error) {
        console.error('Failed to get the refresh token:', error);
        return null;
    }
};

export const storeToken = async (token: string) => {
    try {
        const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
        await AsyncStorage.setItem('@auth_token', encryptedToken);
    } catch (error) {
        console.error('Failed to store the auth token:', error);
    }
};

export const getAuthToken = async (): Promise<string | null> => {
    try {

        const encryptedToken = await AsyncStorage.getItem('@auth_token');
        if (encryptedToken) {
            const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            return originalText;
        }
        return null;
    } catch (error) {
        console.error('Error getting the auth token:', error);
        return null;
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('@auth_token');
    } catch (error) {
        console.error('Failed to remove the auth token:', error);
    }
};


// Decode JWT token to check if it is expired
export const tokenIsExpired = (token: string | null): boolean => {
    if (!token) return true;
    console.log("TOKEN EXPIRED");

    try {
        const decoded: any = jwtDecode(token); // Make sure jwt-decode is correctly imported
        console.log("decode " + decoded);

        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding the auth token:', error);
        return true;
    }
};
