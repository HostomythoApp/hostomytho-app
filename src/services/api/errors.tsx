import { ErrorType } from "models/ErrorType";
import api from "./index";

export const getTypesError = async (): Promise<ErrorType[] | any> => {
    try {
      const response = await api.get("/errors/getTypesError");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };