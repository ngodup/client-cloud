import React, { createContext, useState, useEffect } from "react";
import { login, getUserInfo } from "../utils/userAPI";
import { User } from "../interfaces/user";

export interface AuthContextProps {
  user: any | undefined;
  isAuthenticated: boolean;
  error: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  // handleRegister: (
  //   name: string,
  //   email: string,
  //   password: string
  // ) => Promise<void>;
  handleLogout: () => void;
}

export const defaultContextValue: AuthContextProps = {
  user: undefined,
  isAuthenticated: false,
  error: null,
  handleLogin: async () => {},
  // handleRegister: async () => {},
  handleLogout: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      getUserInfo(token).then((userData) => {
        setUser(userData);
        setIsAuthenticated(true);
      });
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { token } = await login(email, password);
      setCookie("token", token);
      const userData = await getUserInfo(token);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your email and password.");
    }
  };

  // const handleRegister = async (
  //   name: string,
  //   email: string,
  //   password: string
  // ) => {
  //   try {
  //     const { token } = await register(name, email, password);
  //     setCookie("token", token);
  //     const userData = await getUserInfo(token);
  //     setUser(userData);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     console.error(error);
  //     setError("Registration failed. Please check your input and try again.");
  //   }
  // };

  const handleLogout = () => {
    setUser(undefined);
    setIsAuthenticated(false);
    deleteCookie("token");
  };

  const getCookie = (name: string) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim().split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  };

  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; secure; HttpOnly`;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        handleLogin,
        // handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
