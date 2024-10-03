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
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTestSpecification = async (testSpecification: Omit<TestSpecification, 'id'>): Promise<TestSpecification> => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    const response = await api.post(`/testSpecifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, testSpecification
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

