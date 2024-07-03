import CryptoJS from "react-native-crypto-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from 'react-native'; // To differentiate between platforms
import { jwtDecode } from "jwt-decode";

// Set a secret key for encryption - ensure to keep this secure and possibly configurable
const SECRET_KEY = 'your_secret_key_here';

// Assuming CryptoJS and AsyncStorage for token handling
export const getRefreshToken = async (): Promise<string | null> => {
    try {
        if (Platform.OS === 'web') {
            const encryptedToken = localStorage.getItem('refresh_token');
            if (encryptedToken) {
                const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
                return bytes.toString(CryptoJS.enc.Utf8);
            }
        } else {
            const encryptedToken = await AsyncStorage.getItem('@refresh_token');
            if (encryptedToken) {
                const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
                return bytes.toString(CryptoJS.enc.Utf8);
            }
        }
        return null;
    } catch (error) {
        console.error('Failed to get the refresh token:', error);
        return null;
    }
};


export const storeToken = async (token: string) => {
    try {
        if (Platform.OS === 'web') {
            const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
            localStorage.setItem('auth_token', encryptedToken);
        } else {
            await AsyncStorage.setItem('@auth_token', token);
        }
    } catch (error) {
        console.error('Failed to store the auth token:', error);
    }
};

export const getAuthToken = async (): Promise<string | null> => {
    try {
        if (Platform.OS === 'web') {
            const encryptedToken = localStorage.getItem('auth_token');
            if (encryptedToken) {
                const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
                return bytes.toString(CryptoJS.enc.Utf8);
            }
            return null;
        } else {
            return await AsyncStorage.getItem('@auth_token');
        }
    } catch (error) {
        console.error('Error getting the auth token:', error);
        return null;
    }
};

export const removeToken = async () => {
    try {
        if (Platform.OS === 'web') {
            localStorage.removeItem('auth_token');
        } else {
            await AsyncStorage.removeItem('@auth_token');
        }
    } catch (error) {
        console.error('Failed to remove the auth token:', error);
    }
};

// Decode JWT token to check if it is expired
export const tokenIsExpired = (token: string | null): boolean => {
    if (!token) return true;

    try {
        const decoded: any = jwtDecode(token); // Make sure jwt-decode is correctly imported
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding the auth token:', error);
        return true;
    }
};
