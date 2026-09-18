import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");

  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axiosInstance.post(
    "/categories",
    categoryData
  );

  return response.data;
};

export const updateCategoryApi = async (
  categoryId,
  categoryData
) => {
  const response = await axiosInstance.patch(
    `/categories/${categoryId}`,
    categoryData
  );

  return response.data;
};

export const deleteCategoryApi = async (categoryId) => {
  const response = await axiosInstance.delete(
    `/categories/${categoryId}`
  );

  return response.data;
};