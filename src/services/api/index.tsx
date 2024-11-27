import axios from "axios";
import { API_URL } from "@env";

const api = axios.create({
  // baseURL: "https://codeine.atilf.fr/api",
  baseURL: "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;