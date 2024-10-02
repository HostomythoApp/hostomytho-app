import { Variable } from "models/Variable";
import api from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getVariables = async (): Promise<Variable[]> => {
  const token = await AsyncStorage.getItem("@auth_token");
  try {
    const response = await api.get('/variables/', {
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

export const getVariableByKey = async (key: string): Promise<Variable> => {
  const token = await AsyncStorage.getItem("@auth_token");
  try {
    const response = await api.get(`/variables/${key}`, {
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

export const updateVariables = async (variables: { [key: string]: string | number }): Promise<void> => {
  const token = await AsyncStorage.getItem("@auth_token");
  try {
    await api.put('/variables/updateVariables',
      { variables },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
