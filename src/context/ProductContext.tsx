"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ProductType2 } from "@/type/ProductType"; // Assuming ProductType2 is defined elsewhere
import { fetchProducts } from "@/utils/api.service"; // Assuming `fetchProducts` is your API function
import { debounce, DebouncedFunc } from 'lodash';

interface ProductContextProps {
  children: ReactNode;
}

interface PayloadType {
  storeName: string;
  currentPage: number;
  limit: number;
  category: string;
  searchText: string;
  activeStatusTab: string | null; // If this is nullable
  sort: number; // Assuming this is either -1 or 1 for sorting direction
}

interface ProductContextValue {
  products: ProductType2[];
  fetchProductsData: DebouncedFunc<(payload: PayloadType) => Promise<void>>; // Use DebouncedFunc type
  updatePayload: (newPayload: Partial<PayloadType>) => void; // Use PayloadType here
  getProductByID: (id: string) => ProductType2 | undefined; // Function to get a product by ID
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined
);

export const useProductContext = (): ProductContextValue => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<ProductContextProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductType2[]>([]);
  const [payload, setPayload] = useState<PayloadType>({
    storeName: "",
    currentPage: 1,
    limit: 10,
    category: "",
    searchText: "",
    activeStatusTab: null,
    sort: -1,
  });

  const fetchProductsData = debounce(async (payload) => {
    try {
      const response = await fetchProducts(payload);
      setProducts(response?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, 500); // 300ms debounce delay

  const updatePayload = (newPayload: Partial<PayloadType>) => {
    setPayload((prev) => ({ ...prev, ...newPayload }));
  };

  const getProductByID = (id: string): ProductType2 | undefined => {
    return products.find((product) => product._id === id); // Filter products to find the one with the matching ID
  };

  useEffect(() => {
    // Call the debounced function
    fetchProductsData(payload);
    // Cleanup function to cancel debounced calls
    return () => {
      fetchProductsData.cancel();
    };
  }, [payload]); // Re-run effect when `payload` changes

  const contextValue: ProductContextValue = {
    products,
    fetchProductsData,
    updatePayload,
    getProductByID,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
