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
  reloadOrders: () => void; // Function to reload orders manually
  getOrderByID: (id: string) => Order | undefined; // Function to get order by ID
}

// Create Context
const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

// Context Provider
export const OrdersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { storeData } = useStore();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const fetchedOrders = await fetchPlacedOrders(
        storeData?.store?.businessName || ""
      );
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderByID = (id: string): Order | undefined => {
    return orders.find((order) => order._id === id); // Find the order with the matching ID
  };

  useEffect(() => {
    if (storeData?.store?.businessName) {
      loadOrders();
    }
  }, [storeData?.store?.businessName]);

  return (
    <OrdersContext.Provider
      value={{ orders, loading, reloadOrders: loadOrders, getOrderByID }}
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
