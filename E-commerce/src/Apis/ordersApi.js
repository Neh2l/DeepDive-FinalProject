import axiosInstance from "./axiosInstance";

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post("/orders", orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await axiosInstance.get("/orders/my-orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await axiosInstance.patch(`/orders/${id}/cancel`);
  return response.data;
};