import axiosInstance from "./axiosInstance";

export const getProducts = async () => {
  const response = await axiosInstance.get("/products");

  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(
    `/products/${id}`
  );

  return response.data;
};

export const createProduct = async (productData) => {
  console.log("🚀 CREATE PRODUCT API CALLED");
  console.log("📦 FormData:", productData);

  try {
    const response = await axiosInstance.post(
      "/products",
      productData
    );

    console.log("🎉 API RESPONSE:", response);

    return response.data;
  } catch (error) {
    console.error(
      "💥 API ERROR:",
      error
    );

    console.error(
      "💥 API ERROR RESPONSE:",
      error.response?.data
    );

    console.error(
      "💥 API ERROR STATUS:",
      error.response?.status
    );

    throw error;
  }
};

export const updateProductApi = async (
  id,
  productData
) => {
  const response = await axiosInstance.put(
    `/products/${id}`,
    productData
  );

  return response.data;
};

export const deleteProductApi = async (id) => {
  const response = await axiosInstance.delete(
    `/products/${id}`
  );

  return response.data;
};