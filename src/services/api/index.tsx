import axios from "axios";
import { API_URL } from "@env";

// TODO Faire avec fichier ENV ou mettre dans commande
const api = axios.create({
  baseURL: API_URL
});

export default api;