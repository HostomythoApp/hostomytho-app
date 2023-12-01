import axios from "axios";
import { API_URL } from "@env";

const api = axios.create({
  baseURL: "https://codeine.atilf.fr/api"
  // baseURL: "http://localhost:3001"
});

export default api;