import React, { createContext, useState, useEffect } from "react";
import { login, getUserInfo } from "../utils/userAPI";
import { User } from "../interfaces/user";

export interface AuthContextProps {
  user: User | undefined;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export const defaultContextValue: AuthContextProps = {
  user: undefined,
  isAuthenticated: false,
  token: null,
  error: null,
  handleLogin: async () => {},
  handleLogout: () => {},
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>(defaultContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getUserInfo(storedToken).then((userData) => {
        setUser(userData);
        setIsAuthenticated(true);
      });
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      setToken(token);
      const userData = await getUserInfo(token);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your email and password.");
    }
  };

  const handleLogout = () => {
    setUser(undefined);
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        error,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
