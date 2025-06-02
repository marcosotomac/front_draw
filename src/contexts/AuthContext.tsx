import React, { createContext, useContext, useState, useEffect } from "react";

import { apiClient } from "../services/api";
import { APP_CONFIG } from "../config/constants";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on initial load
    const storedToken = localStorage.getItem(APP_CONFIG.storage.authToken);

    if (storedToken) {
      setToken(storedToken);
      // Fetch user data using the stored token
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await apiClient.getMe();

      setUser(userData as User);
    } catch {
      // If token is invalid, clear everything
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Development mode test credentials
      if (email === "test@example.com" && password === "test123") {
        const mockUser: User = {
          id: "test-user-id",
          email: "test@example.com",
          firstName: "Test",
          lastName: "User",
        };
        const mockToken = "test-token-123";

        apiClient.setAuthToken(mockToken);
        setToken(mockToken);
        setUser(mockUser);
        return;
      }

      const data = await apiClient.login(email, password);
      const { token: newToken, user: userData } = data;

      apiClient.setAuthToken(newToken);
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      // Development mode test credentials
      if (email === "test@example.com") {
        const mockUser: User = {
          id: "test-user-id",
          email: "test@example.com",
          firstName,
          lastName,
        };
        const mockToken = "test-token-123";

        apiClient.setAuthToken(mockToken);
        setToken(mockToken);
        setUser(mockUser);
        return;
      }

      await apiClient.signup(firstName, lastName, email, password);

      // After successful signup, automatically log in the user
      await login(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiClient.clearAuth();
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
