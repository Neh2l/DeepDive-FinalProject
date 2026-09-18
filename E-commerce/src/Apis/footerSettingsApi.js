import axiosInstance from "./axiosInstance";

export const getFooterSettings = async () => {
  const response = await axiosInstance.get("/footer-settings");
  return response.data;
};

export const updateFooterSettings = async (settings) => {
  const response = await axiosInstance.patch(
    "/footer-settings",
    settings
  );

  return response.data;
};