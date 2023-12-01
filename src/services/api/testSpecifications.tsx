import { TestSpecification } from "models/TestSpecification";
import api from "./index";

export const getTestSpecificationsByTextId = async (textId: number, gameType: 'hypothesis' | 'condition' | 'negation'): Promise<TestSpecification[]> => {
  try {
    const response = await api.get(`/testSpecifications/${textId}/${gameType}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTestSpecification = async (testSpecification: Omit<TestSpecification, 'id'>): Promise<TestSpecification> => {
  try {
    const response = await api.post('/testSpecifications', testSpecification);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
