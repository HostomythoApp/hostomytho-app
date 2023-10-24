import { TestPlausibilityError } from "models/TestPlausibilityError";
import api from "./index";


export const getTestPlausibilityErrorByTextId = async (textId: number): Promise<TestPlausibilityError[]> => {
  try {
    const response = await api.get(`/plausibility/${textId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const getCorrectPlausibilityByTextId = async (textId: number): Promise<number> => {

  try {
    const response = await api.get(`/plausibility/correctPlausibility/${textId}`);
    return response.data.test_plausibility;
  } catch (error) {
    console.error(error);
    throw error;
  }
};