import axios from "axios";
import { API_URL } from "@env";

const api = axios.create({
  baseURL: "https://codeine.atilf.fr/api"
});

export default api;