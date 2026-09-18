import axiosInstance from "./axiosInstance";

/* =========================================================
   CREATE ORDER - BUYER
========================================================= */

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post(
    "/orders",
    orderData
  );

  return response.data;
};


/* =========================================================
   GET MY ORDERS - BUYER
========================================================= */

export const getMyOrders = async () => {
  const response = await axiosInstance.get(
    "/orders/my-orders"
  );

  return response.data;
};


/* =========================================================
   GET ORDER BY ID - BUYER
========================================================= */

export const getOrderById = async (id) => {
  const response = await axiosInstance.get(
    `/orders/${id}`
  );

  return response.data;
};


/* =========================================================
   CANCEL ORDER - BUYER
========================================================= */

export const cancelOrder = async (id) => {
  const response = await axiosInstance.patch(
    `/orders/${id}/cancel`
  );

  return response.data;
};


/* =========================================================
   GET ALL ORDERS - ADMIN
========================================================= */

export const getAllOrders = async (params = {}) => {
  const response = await axiosInstance.get(
    "/orders",
    {
      params,
    }
  );

  return response.data;
};


/* =========================================================
   UPDATE ORDER STATUS - ADMIN
========================================================= */

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await axiosInstance.patch(
    `/orders/${orderId}/status`,
    {
      status,
    }
  );

  return response.data;
};