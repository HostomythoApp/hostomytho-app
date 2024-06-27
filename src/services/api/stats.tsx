import api from "./index";

// ****************** User ******************
export const getUserRegistrationsDate = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getUserRegistrationsDate');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeUserRegistrations = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getCumulativeUserRegistrations');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** Games ******************
export const getCumulativeAnnotationsGames = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getCumulativeAnnotationsGames');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** Text Rating ******************
export const getRatingPlausibilityDate = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getRatingPlausibilityDate');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeRatingPlausibility = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getCumulativeRatingPlausibility');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** ErrorDetail ******************
export const getUserErrorDetailDate = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getUserErrorDetailDate');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeUserErrorDetail = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getCumulativeUserErrorDetail');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** UserTypingErrors ******************
export const getUserTypingErrorsDate = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getUserTypingErrorsDate');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeUserTypingErrors = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getCumulativeUserTypingErrors');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ****************** UserSentenceSpecification ******************
export const getUserSentenceSpecificationDate = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getUserSentenceSpecificationDate');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCumulativeUserSentenceSpecification = async (): Promise<any[]> => {
    try {
        const response = await api.get('/stats/getCumulativeUserSentenceSpecification');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};