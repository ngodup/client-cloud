import React, { createContext, useState, useEffect } from "react";
import { login, getUserInfo } from "../utils/userAPI";
import { UserResponse } from "../interfaces/user";

export interface AuthContextProps {
  userResponse: UserResponse | undefined;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export const defaultContextValue: AuthContextProps = {
  userResponse: undefined,
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
  const [userResponse, setUserResponse] = useState<UserResponse | undefined>(
    undefined
  );
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getUserInfo(storedToken).then((userData) => {
        setUserResponse(userData);
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
      setUserResponse(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setError(
        "La connexion a échoué. Veuillez vérifier votre email et votre mot de passe."
      );
    }
  };

  const handleLogout = () => {
    setUserResponse(undefined);
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        userResponse,
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
