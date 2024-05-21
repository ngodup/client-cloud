import axios from "axios";
import { UserProfile, UserResponse } from "../interfaces/user";
import { Comment } from "../interfaces/comment";
import { ShoppingCartState } from "../interfaces/shoppingCart";

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

export const editProfile = async (
  userProfileId: number,
  formData: UserProfile,
  token: string
): Promise<UserProfile> => {
  const response = await axios.patch(
    `http://127.0.0.1:8000/api/user-profiles/${userProfileId}`,
    formData, // here
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addComment = async (
  productId: number,
  content: string,
  token: string
): Promise<Comment> => {
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

export const updateComment = async (
  commentId: number,
  content: string,
  token: string
): Promise<Comment> => {
  const response = await axios.patch(
    `http://127.0.0.1:8000/api/comments/${commentId}`,
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
    const response = await axios.get(
      `http://127.0.0.1:8000/api/comments/user?email=${encodeURIComponent(
        email
      )}`, // Include the email parameter as a query parameter
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAComment = async (
  commentId: number,
  token: string
): Promise<void> => {
  const response = await axios.delete(
    `http://127.0.0.1:8000/api/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createOrder = async (
  orderData: ShoppingCartState, // Use the correct type here
  token: string
): Promise<void> => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/orders",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const getUserOrders = async (
  token: string
): Promise<ShoppingCartState[]> => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/orders/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
