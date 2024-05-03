import axios from "axios";
import { UserResponse } from "../interfaces/user";
import { CommentResponse, Comment } from "../interfaces/comment";

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

export const addComment = async (
  productId: number,
  content: string,
  token: string
): Promise<CommentResponse> => {
  const response = await axios.post(
    `http://127.0.0.1:8000/api/products/${productId}/comments`,
    { content: content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUserComments = async (
  token: string,
  email: string
): Promise<Comment[]> => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/comments/user",
      { email: email }, // Include the email parameter in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set the Content-Type header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//No need
// export const logout = async () => {
//   await api.get<{ token: string }>("/logout");
//   return;
// };
