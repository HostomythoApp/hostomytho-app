import { Text } from "models/Text";
import { TextWithTokens } from "interfaces/TextWithTokens";
import api from "./index";
import { TextWithError } from "interfaces/TextWithError";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNumberOfTexts = async (): Promise<number> => {
  try {
    const response = await api.get(`/texts/getNumberOfTexts`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllTexts = async (): Promise<Text[]> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.get(`/texts`, {
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

// Inutile pour le moment
export const getTextWithTokensNotPlayed = async (userId: number, gameType: string): Promise<TextWithTokens> => {
  try {
    const response = await api.get(`/texts/getTextWithTokensNotPlayed/${userId}/${gameType}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

// Inutile pour le moment
export const getSmallTextWithTokensNotPlayed = async (userId: number, gameType: string): Promise<TextWithTokens> => {
  try {
    const response = await api.get(`/texts/getSmallTextWithTokensNotPlayed/${userId}/${gameType}/110`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

// Inutile pour le moment
export const getSmallTextWithTokens = async (gameType: string): Promise<TextWithTokens> => {
  try {
    const response = await api.get(`/texts/getSmallTextWithTokens/${gameType}/110`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

// Inutile pour le moment
export const getTextWithTokensByGameType = async (gameType: string): Promise<TextWithTokens> => {
  try {
    const response = await api.get(`/texts/getTextWithTokensByGameType/${gameType}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

export const getTextWithErrorValidatedNotPlayed = async (userId: number): Promise<TextWithError> => {
  try {
    const response = await api.get(`/texts/getTextWithErrorValidatedNotPlayed/${userId}/`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

export const getTextWithErrorValidated = async (): Promise<TextWithError> => {
  try {
    const response = await api.get(`/texts/getTextWithErrorValidated`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

export const getTextWithErrorValidatedById = async (textId: number): Promise<TextWithError> => {
  try {
    const response = await api.get(`/texts/getTextWithErrorValidatedByErrorId/${textId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

export const getTextTestWithErrorValidated = async (): Promise<TextWithError> => {
  try {
    const response = await api.get(`/texts/getTextTestWithErrorValidated`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

export const getTextWithTokensById = async (textId: number): Promise<TextWithTokens> => {
  try {
    const response = await api.get(`/texts/getTextWithTokensById/${textId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

export const getTextTestNegation = async (): Promise<TextWithTokens> => {
  try {
    const response = await api.get(`/sentenceSpecifications/getTextTestNegation`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

export const getTextTestPlausibility = async (): Promise<TextWithTokens> => {
  try {
    const response = await api.get(`/texts/getTextTestPlausibility`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Config:', error.config);
    }
    throw error;
  }
};

export const getTextById = async (id: number): Promise<Text[]> => {
  const token = await AsyncStorage.getItem("@auth_token");
  try {
    const response = await api.get(`/texts/${id}`,
      {
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

export const getPlausibilityText = async (): Promise<TextWithTokens> => {
  try {
    const response = await api.get(`/plausibility/getText`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createText = async (text: Partial<Text>) => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.post("/texts", text, {
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


export const updateText = async (idText: number, updatedText: { text: Partial<Text> }) => {
  const token = await AsyncStorage.getItem("@auth_token");
  try {
    const response = await api.put(`/texts/${idText}`, updatedText, {
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

export const deleteText = async (id: number) => {
  const token = await AsyncStorage.getItem("@auth_token");
  try {
    const response = await api.delete(`/texts/${id}`, {
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