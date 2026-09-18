import axiosInstance from "./axiosInstance";

export const createPaymentIntention = async (paymentData) => {
  const response = await axiosInstance.post(
    "/paymob/create-intention",
    paymentData
  );

  return response.data;
};