import { Skin } from "models/Skin";
import api from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllSkins = async (): Promise<Skin[]> => {
    try {
        const response = await api.get('/skins');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserSkins = async (userId: number): Promise<Skin[]> => {
    try {
        const response = await api.get(`/skins/byUserId/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getEquippedUserSkins = async (userId: number): Promise<Skin[]> => {
    try {
        const response = await api.get(`/skins/equipped/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const equipSkin = async (skinId: number): Promise<Skin> => {
    try {
        const token = await AsyncStorage.getItem("@auth_token");
        const response = await api.put(`/skins/equip/${skinId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const unequipSkin = async (skinId: number): Promise<Skin> => {
    try {
        const token = await AsyncStorage.getItem("@auth_token");
        const response = await api.put(`/skins/unequip/${skinId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
