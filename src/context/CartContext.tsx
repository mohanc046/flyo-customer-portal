"use client";

// CartContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ProductType2 } from "@/type/ProductType";

interface CartItem extends ProductType2 {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartState {
  cartArray: CartItem[];
  isLoading: boolean;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: ProductType2 }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | {
      type: "UPDATE_CART";
      payload: {
        itemId: string;
        quantity: number;
        selectedSize: string;
        selectedColor: string;
      };
    }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "SET_LOADING"; payload: boolean };

interface CartContextProps {
  cartState: CartState;
  addToCart: (item: ProductType2) => void;
  removeFromCart: (itemId: string) => void;
  updateCart: (
    itemId: string,
    quantity: number,
    selectedSize: string,
    selectedColor: string
  ) => void;
  setLoading: (isLoading: boolean) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem: CartItem = {
        ...action.payload,
        quantity: 1,
        selectedSize: "",
        selectedColor: "",
      };
      return {
        ...state,
        cartArray: [...state.cartArray, newItem],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartArray: state.cartArray.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "UPDATE_CART":
      return {
        ...state,
        cartArray: state.cartArray.map((item) =>
          item._id === action.payload.itemId
            ? {
                ...item,
                quantity: action.payload.quantity,
                selectedSize: action.payload.selectedSize,
                selectedColor: action.payload.selectedColor,
              }
            : item
        ),
      };
    case "LOAD_CART":
      return {
        ...state,
        cartArray: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    cartArray: [],
    isLoading: false,
  });

  const addToCart = (item: ProductType2) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };

  const updateCart = (
    itemId: string,
    quantity: number,
    selectedSize: string,
    selectedColor: string
  ) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { itemId, quantity, selectedSize, selectedColor },
    });
  };

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  };

  return (
    <CartContext.Provider
      value={{ cartState, addToCart, removeFromCart, updateCart, setLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
