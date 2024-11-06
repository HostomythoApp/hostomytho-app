import { Admin } from "models/Admin";
import api from "./index";

// export const getAdmins = async (): Promise<Admin[]> => {
//   try {
//     const response = await api.get("/admins");
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getAdminById = async (id: number): Promise<Admin[]> => {
//   try {
//     const response = await api.get(`/admins/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const signUpAdmin = async (admin: Admin) => {
//   try {
//     const response = await api.post("/admins/signup", { admin });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const signInAdmin = async (username: string, password: string) => {
//   try {
//     const response = await api.post("/admins/signin", {
//       username,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const updateAdmin = async (id: number, points: number) => {
//   try {
//     const response = await api.put(`/admins/${id}`, {
//       points,
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
