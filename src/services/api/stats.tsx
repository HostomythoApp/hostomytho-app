import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./index";


// ****************** Stats Page ******************
export const getTotalUsersCount = async (): Promise<number> => {
    try {
        const response = await api.get('/stats/getTotalUsers');
        return response.data.totalUsers;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre total d'utilisateurs :", error);
        throw error;
    }
};

export const getUserAnnotationsCount = async (): Promise<number> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getUserAnnotations', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.userAnnotations;
    } catch (error) {
        console.error("Erreur lors de la récupération des annotations de l'utilisateur :", error);
        throw error;
    }
};

export const getTotalAnnotationsCount = async (): Promise<number> => {
    try {
        const response = await api.get('/stats/getTotalAnnotations');
        return response.data.totalAnnotations;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre total d'annotations :", error);
        throw error;
    }
};

// ****************** User ******************
export const getUserRegistrationsDate = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getUserRegistrationsDate', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeUserRegistrations = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getCumulativeUserRegistrations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserTypesCount = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getUserTypesCount', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** Games ******************
export const getCumulativeAnnotationsGames = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getCumulativeAnnotationsGames', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** Text Rating ******************
export const getRatingPlausibilityDate = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getRatingPlausibilityDate', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeRatingPlausibility = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getCumulativeRatingPlausibility', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** ErrorDetail ******************
export const getUserErrorDetailDate = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getUserErrorDetailDate', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeUserErrorDetail = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getCumulativeUserErrorDetail', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** UserTypingErrors ******************
export const getUserTypingErrorsDate = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getUserTypingErrorsDate', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeUserTypingErrors = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getCumulativeUserTypingErrors', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** UserSentenceSpecification ******************
export const getUserSentenceSpecificationDate = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getUserSentenceSpecificationDate', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeUserSentenceSpecification = async (): Promise<any[]> => {
    const token = await AsyncStorage.getItem("@auth_token");
    try {
        const response = await api.get('/stats/getCumulativeUserSentenceSpecification', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};