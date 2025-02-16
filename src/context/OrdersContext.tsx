"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchPlacedOrders } from "@/utils/api.service";
import { useStore } from "@/context/StoreContext";
import { getDomainName } from "@/utils/utils";

// Define Types
interface Order {
  _id: string;
  orderId: string;
  totalOrderCost: number;
  status: string;
  products: any[]; // Define the product type more specifically if available
}

interface OrdersContextProps {
  orders: Order[];
  loading: boolean;
  reloadOrders: () => Promise<void>; // Function to reload orders manually
  getOrderByID: (id: string) => Order | undefined; // Function to get order by ID
}

// Create Context
const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

// Independent `loadOrders` Function
export const loadOrders = async (
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  setLoading(true);
  try {
    const fetchedOrders = await fetchPlacedOrders(getDomainName() || "");
    setOrders(fetchedOrders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  } finally {
    setLoading(false);
  }
};

// Context Provider
export const OrdersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { storeData } = useStore();

  // Load orders when the context is initialized
  useEffect(() => {
    if (getDomainName()) {
      loadOrders(setOrders, setLoading);
    }
  }, [getDomainName()]);

  const getOrderByID = (id: string): Order | undefined => {
    return orders.find((order) => order._id === id); // Find the order with the matching ID
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        reloadOrders: () => loadOrders(setOrders, setLoading), // Pass the same function to reload orders
        getOrderByID,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// Custom Hook
export const useOrders = (): OrdersContextProps => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
