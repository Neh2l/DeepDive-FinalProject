import axiosInstance from "./axiosInstance";

export const sendContactMessage = async (contactData) => {
  const response = await axiosInstance.post("/contact", contactData);

  return response.data;
};