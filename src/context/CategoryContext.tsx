"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { fetchCategoryList } from "@/utils/api.service"; // Assumes this function exists and fetches categories

// Define the structure of a category
interface Category {
  key: string;
  value: string;
}

// Props for the CategoryProvider
interface CategoryContextProps {
  children: ReactNode;
}

// Value provided by the context
interface CategoryContextValue {
  categoryList: Category[];
  fetchCategoriesData: () => void;
  isLoading: boolean;
  error: string | null;
}

// Create the context
const CategoryContext = createContext<CategoryContextValue | undefined>(
  undefined
);

// Hook to use the context
export const useCategoryContext = (): CategoryContextValue => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};

// The provider component
export const CategoryProvider: React.FC<CategoryContextProps> = ({
  children,
}) => {
  const [categoryList, setCategoriesList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from the API
  const fetchCategoriesData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchCategoryList(); // Assumes the function returns the correct API structure
      // Set the categories if the response is valid
      setCategoriesList(response.categoryList || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories on initial render
  useEffect(() => {
    fetchCategoriesData();
  }, []);

  // Context value
  const contextValue: CategoryContextValue = {
    categoryList,
    fetchCategoriesData,
    isLoading,
    error,
  };

  // Return the provider
  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};
