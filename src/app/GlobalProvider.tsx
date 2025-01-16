import React from "react";
import { CartProvider } from "@/context/CartContext";
import { ModalCartProvider } from "@/context/ModalCartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ModalWishlistProvider } from "@/context/ModalWishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { ModalCompareProvider } from "@/context/ModalCompareContext";
import { ModalSearchProvider } from "@/context/ModalSearchContext";
import { ModalQuickviewProvider } from "@/context/ModalQuickviewContext";
import { ProductProvider } from "@/context/ProductContext"; // Import the new ProductProvider
import { CategoryProvider } from "@/context/CategoryContext";
import { StoreProvider } from "@/context/StoreContext";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CartProvider>
      <ModalCartProvider>
        <WishlistProvider>
          <ModalWishlistProvider>
            <CompareProvider>
              <ModalCompareProvider>
                <ModalSearchProvider>
                  <ModalQuickviewProvider>
                    <ProductProvider>
                      <CategoryProvider>
                        <StoreProvider>{children}</StoreProvider>
                      </CategoryProvider>
                    </ProductProvider>
                  </ModalQuickviewProvider>
                </ModalSearchProvider>
              </ModalCompareProvider>
            </CompareProvider>
          </ModalWishlistProvider>
        </WishlistProvider>
      </ModalCartProvider>
    </CartProvider>
  );
};

export default GlobalProvider;
