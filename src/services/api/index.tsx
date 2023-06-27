import axios from "axios";
import { API_URL } from "@env";

const api = axios.create({
  baseURL: "https://codeine.atilf.fr/api"
});
console.log(API_URL);

export default api;