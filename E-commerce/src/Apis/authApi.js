
import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const verifyEmail = async (verificationData) => {
  const response = await axiosInstance.post(
    "/auth/verify-email",
    verificationData
  );
  return response.data;
};

// RESEND VERIFICATION CODE
export const resendVerificationCode = async (email) => {
  const response = await axiosInstance.post(
    "/auth/resend-verification",
    { email }
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axiosInstance.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};
