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

export const getMessageMenu = async (messageType: string) => {
  try {
    const response = await api.get(`/utils/messageMenu?messageType=${messageType}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const changeMessageMenu = async (messageMenu: MessageMenu) => {
//   try {
//     const response = await api.put("/utils/messageMenu", messageMenu);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const updateMenuMessageActive = async (messageId: number, isActive: boolean) => {
  try {
    const response = await api.put(`/utils/updateMenuMessageActive/${messageId}`, { active: isActive });
    return response.data;
  } catch (error) {
    console.error('Failed to update menu message active status:', error);
    throw error;
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