import { TestSpecification } from "models/TestSpecification";
import api from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTestSpecificationsByTextId = async (textId: number, gameType: 'hypothesis' | 'condition' | 'negation'): Promise<TestSpecification[]> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.get(`/testSpecifications/${textId}/${gameType}`, {
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

export const createTestSpecification = async (testSpecification: any): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.post(`/testSpecifications`, testSpecification, {
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

export const deleteTestSpecificationsByTextId = async (textId: number): Promise<void> => {
  const token = await AsyncStorage.getItem("@auth_token");
  try {
    await api.delete(`/testSpecifications/deleteByTextId/${textId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

