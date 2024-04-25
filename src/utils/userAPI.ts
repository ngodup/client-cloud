import axios from "axios";
import { UserResponse } from "../interfaces/user";

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

export const getUserInfo = async (token: string): Promise<UserResponse> => {
  const response = await api.get<UserResponse>("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
