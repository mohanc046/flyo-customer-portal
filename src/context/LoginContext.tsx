"use client";

import { getServiceURL } from "@/utils/utils";
import axios from "axios";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context types
interface LoginContextProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  authenticateGoogleLogin: (params: GoogleLoginParams) => Promise<void>;
}

interface GoogleLoginParams {
  credential: string;
  navigateToDashboard: () => void;
}

// Create the context
const LoginContext = createContext<LoginContextProps | undefined>(undefined);

// Provide the context to children components
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authenticateGoogleLogin = async ({
    credential,
    navigateToDashboard,
  }: GoogleLoginParams) => {
    try {
      setIsLoading(true);

      const loginResponse = await axios.post(
        `${getServiceURL()}/user/auth/google/callback`,
        {
          token: credential,
        }
      );

      const {
        data: {
          statusCode = "500",
          message = "Login successful!",
          authToken = "",
          userInfo = {},
        },
      } = loginResponse;

      if (statusCode === 200) {
        localStorage.setItem("access_token", authToken);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigateToDashboard();
        return;
      }

      // Handle errors
      console.error("Login failed:", message);
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        isLoading,
        setIsLoading,
        authenticateGoogleLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the LoginContext
export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
