"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback
} from "react";
import { fetchCategoryList } from "@/utils/api.service"; // Assumes this function exists and fetches categories
import { debounce } from 'lodash'; // Import debounce from lodash

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
  const fetchCategoriesData = useCallback(
    debounce(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchCategoryList(); // Assumes the function returns the correct API structure
        setCategoriesList(response.categoryList || []); // Set the categories if the response is valid
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories');
      } finally {
        setIsLoading(false);
      }
    }, 300), // 300ms debounce delay
    [] // Dependency array for useCallback
  );

  useEffect(() => {
    fetchCategoriesData(); // Call the debounced function
    // Cleanup function to cancel debounced calls
    return () => {
      fetchCategoriesData.cancel();
    };
  }, [fetchCategoriesData]); // Re-run effect if debouncedFetchCategoriesData changes

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
