"use client";

import { getServiceURL } from "@/utils/utils";
import axios from "axios";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context types
interface LoginContextProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  authenticateGoogleLogin: (params: GoogleLoginParams) => Promise<void>;
  authenticateFaceBookLogin: (params: GoogleLoginParams) => Promise<void>;
  initiateLoginWithEmail: (params: EmailLoginParams) => Promise<void>;
  verifyLoginOTP: (params: OTPVerificationParams) => Promise<void>;
}

interface GoogleLoginParams {
  credential: string;
  navigateToDashboard: () => void;
}

interface EmailLoginParams {
  email: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

interface OTPVerificationParams {
  state: { email: string; otp: string };
  navigateToDashboard: () => void;
}

// Create the context
const LoginContext = createContext<LoginContextProps | undefined>(undefined);

// Provide the context to children components
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Google Login Function
  const authenticateGoogleLogin = async ({
    credential,
    navigateToDashboard,
  }: GoogleLoginParams) => {
    try {
      setIsLoading(true);
      const loginResponse = await axios.post(
        `${getServiceURL()}/user/auth/google/callback`,
        { token: credential }
      );
      const { statusCode, authToken, userInfo, message } = loginResponse.data;

      if (statusCode === 200) {
        localStorage.setItem("access_token", authToken);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigateToDashboard();
      } else {
        console.error("Google Login failed:", message);
      }
    } catch (error) {
      console.error("An error occurred during Google login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Facebook Login Function
  const authenticateFaceBookLogin = async ({
    credential,
    navigateToDashboard,
  }: GoogleLoginParams) => {
    try {
      setIsLoading(true);
      const loginResponse = await axios.post(
        `${getServiceURL()}/user/auth/facebook/callback`,
        { token: credential }
      );
      const { statusCode, authToken, userInfo, message } = loginResponse.data;

      if (statusCode === 200) {
        localStorage.setItem("access_token", authToken);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigateToDashboard();
      } else {
        console.error("Facebook Login failed:", message);
      }
    } catch (error) {
      console.error("An error occurred during Facebook login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initiate Login with Email
  const initiateLoginWithEmail = async ({
    email,
    setState,
  }: EmailLoginParams) => {
    try {
      setIsLoading(true);
      const userRole = "USER_ROLE"; // Replace with actual logic if needed
      const loginResponse = await axios.post(`${getServiceURL()}/user/login`, {
        email,
        userRole,
      });
      const { statusCode, message } = loginResponse.data;

      if (statusCode === 200) {
        setState((prevState: any) => ({
          ...prevState,
          title: "Enter your verification code",
          screen: "OTP",
          email,
        }));
      } else {
        console.error("Initiate Login failed:", message);
      }
    } catch (error) {
      console.error("An error occurred during email login initiation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const verifyLoginOTP = async ({
    state,
    navigateToDashboard,
  }: OTPVerificationParams) => {
    try {
      setIsLoading(true);
      const { email, otp } = state;
      const loginResponse = await axios.post(`${getServiceURL()}/user/verify`, {
        email,
        otp,
      });
      const { statusCode, authToken, userInfo, existingStoreInfo, message } =
        loginResponse.data;

      if (statusCode === 200) {
        localStorage.setItem("access_token", authToken);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        navigateToDashboard();
      } else {
        console.error("OTP verification failed:", message);
      }
    } catch (error) {
      console.error("An error occurred during OTP verification:", error);
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
        authenticateFaceBookLogin,
        initiateLoginWithEmail,
        verifyLoginOTP,
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
