import { Text } from "models/Text";
import { TextWithTokens } from "interfaces/TextWithTokens";
import api from "./index";
import { TextWithError } from "interfaces/TextWithError";


export const getAllTexts = async (): Promise<Text[]> => {
  try {
    const response = await api.get(`/texts`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Config:', error.config);
    throw error;
  }
};

export const getTextWithTokensNotPlayed = async (userId: number, gameType: string): Promise<TextWithTokens> => {
  // TODO cacher les infos sensibles comme is_test, ...
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

export const getTextWithTokensByGameType = async (gameType: string): Promise<TextWithTokens> => {
  // TODO cacher les infos sensibles comme is_test, ...
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
    const response = await api.get(`/texts/getTextTestNegation`);
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
  try {
    const response = await api.get(`/texts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTextsByTheme = async (theme: string): Promise<Text[]> => {
  try {
    const response = await api.get(`/texts/theme/${theme}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createText = async (text: Partial<Text>) => {
  try {
    const response = await api.post("/texts", text);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateText = async (updatedText: { text: Partial<Text> }) => {
  const { text } = updatedText;
  try {
    const response = await api.put(`/texts/${text.id}`, text);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteText = async (id: number) => {
  try {
    const response = await api.delete(`/texts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTextsByOrigin = async (origin: string): Promise<Text[]> => {
  try {
    const response = await api.get(`/texts/origin/${origin}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};