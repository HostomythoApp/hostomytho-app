import axios from "axios";
// TODO Faire avec fichier ENV ou mettre dans commande
const api = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL: "http://10.0.2.2:3001",
});

export default api;