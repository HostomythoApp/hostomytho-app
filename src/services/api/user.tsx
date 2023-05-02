import api from "./index";

export const getUsers = async () => {
  return await api.get("/users");
};

export const getUserById = async (id: number) => {
  return await api.get(`/users/${id}`);
};

export const signUpUser = async (username: string, password: string, status: string, email?: string) => {
  return await api.post("/users/signup", {
    username,
    password,
    email,
    status,
    points: 0,
    trust_index: 0,
    theme: "default",
    notifications_enabled: true,
  });
};

export const signInUser = async (username: string, password: string) => {
  return await api.post("/users/signin", {
    username,
    password,
  });
};