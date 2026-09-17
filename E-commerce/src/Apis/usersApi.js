import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const updateMyProfile = async (userData) => {
  const response = await axiosInstance.patch("/users/me", userData);
  return response.data;
};