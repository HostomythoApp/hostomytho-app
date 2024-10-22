import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./index";

export const dumpTable = async (tableNames: string[]) => {
  const token = await AsyncStorage.getItem("@auth_token");

  try {
    const response = await api.post('/utils/dump/tables', {
      tables: tableNames
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `selected_tables_dump.json`);
    document.body.appendChild(link);
    link.click();
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  } catch (error) {
    console.error("Erreur d'autorisation:", error);
    alert("Erreur d'autorisation:");
  }
};

export const requestReset = async (email: string) => {
  try {
    const response = await api.post("/utils/requestReset", { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post("/utils/refreshToken", { refreshToken });
    return response.data;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

export const getDefinition = async (word: string) => {
  try {
    const response = await api.get(`/utils/getDefinition?word=${word}`);
    if (response.data && response.data.definitions.length > 0) {
      return response.data;
    } else {
      return { error: true, message: "No definitions found on server." };
    }
  } catch (error) {
    console.error("Error fetching definition from server: ", error);
    return { error: true, message: "Server request failed", details: error };
  }
};

export const tokenValidation = async (token: string): Promise<any> => {
  try {
    return await api.get(`/utils/tokenValidation/${token}`);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    return await api.post(`/utils/resetPassword`, {
      token,
      newPassword
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePassword = async (id: number, newPassword: string) => {
  try {
    return await api.post(`/utils/changePassword`, {
      id,
      newPassword
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};