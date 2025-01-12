"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { fetchCategoryList } from "@/utils/api.service"; // Assuming `fetchCategoryList` is your API function

interface CategoryContextProps {
  children: ReactNode;
}

interface CategoryContextValue {
  categoryList: string[]; // Modify based on your API response
  fetchCategoriesData: () => void;
  isLoading: boolean;
  error: string | null;
}

const CategoryContext = createContext<CategoryContextValue | undefined>(
  undefined
);

export const useCategoryContext = (): CategoryContextValue => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};

export const CategoryProvider: React.FC<CategoryContextProps> = ({
  children,
}) => {
  const [categoryList, setCategoriesList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoriesData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchCategoryList();
      setCategoriesList(response.categoryList); // Assuming the API returns an array of categories
    } catch (error) {
      setError("Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesData(); // Fetch categories when the component mounts
  }, []);

  const contextValue: CategoryContextValue = {
    categoryList,
    fetchCategoriesData,
    isLoading,
    error,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};
