import axios from "axios";
import { User } from "../interfaces/user";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  const response = await api.post<{ token: string }>("/login", {
    email,
    password,
  });
  return response.data;
};

export const getUserInfo = async (token: string): Promise<User> => {
  const response = await api.get<User>("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
