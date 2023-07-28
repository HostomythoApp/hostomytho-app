import { Skin } from "models/Skin";
import api from "./index";

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

export const equipSkin = async (userId: number, skinId: number): Promise<Skin> => {
    try {
        const response = await api.put(`/skins/equip/${userId}/${skinId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const unequipSkin = async (userId: number, skinId: number): Promise<Skin> => {
    try {
        const response = await api.put(`/skins/unequip/${userId}/${skinId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
