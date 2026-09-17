import axiosInstance from "./axiosInstance";

export const getProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosInstance.post(
    "/products",
    productData
  );

  return response.data;
};

export const updateProductApi = async (id, productData) => {
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