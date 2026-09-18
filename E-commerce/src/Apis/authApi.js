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

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
};