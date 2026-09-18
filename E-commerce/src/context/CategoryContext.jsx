import { createContext, useContext, useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategoryApi,
  deleteCategoryApi,
} from "../Apis/categoriesApi";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // ==========================================
  // GET CATEGORIES
  // ==========================================

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);

      const response = await getCategories();

      const data =
        response?.data ||
        response?.categories ||
        [];

      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch categories error:", error);
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // ==========================================
  // ADD CATEGORY
  // ==========================================

  const addCategory = async (categoryData) => {
    try {
      const response = await createCategory(categoryData);

      const newCategory =
        response?.data ||
        response?.category;

      if (newCategory) {
        setCategories((prev) => [
          ...prev,
          newCategory,
        ]);
      } else {
        await fetchCategories();
      }

      return response;
    } catch (error) {
      console.error("Create category error:", error);
      throw error;
    }
  };

  // ==========================================
  // UPDATE CATEGORY
  // ==========================================

  const updateCategory = async (
    categoryId,
    categoryData
  ) => {
    try {
      const response = await updateCategoryApi(
        categoryId,
        categoryData
      );

      const updatedCategory =
        response?.data ||
        response?.category;

      if (updatedCategory) {
        setCategories((prev) =>
          prev.map((category) =>
            category._id === categoryId
              ? updatedCategory
              : category
          )
        );
      } else {
        await fetchCategories();
      }

      return response;
    } catch (error) {
      console.error("Update category error:", error);
      throw error;
    }
  };

  // ==========================================
  // DELETE CATEGORY
  // ==========================================

  const removeCategory = async (categoryId) => {
    try {
      const response = await deleteCategoryApi(
        categoryId
      );

      setCategories((prev) =>
        prev.filter(
          (category) =>
            category._id !== categoryId
        )
      );

      return response;
    } catch (error) {
      console.error("Delete category error:", error);
      throw error;
    }
  };

  // ==========================================
  // INITIAL FETCH
  // ==========================================

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoriesLoading,
        fetchCategories,
        addCategory,
        updateCategory,
        removeCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// ==========================================
// CUSTOM HOOK
// ==========================================

export const useCategories = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error(
      "useCategories must be used inside CategoryProvider"
    );
  }

  return context;
};