"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType2 } from "@/type/ProductType";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useCart } from "@/context/CartContext";
import { countdownTime } from "@/store/countdownTime";
import CountdownTimeType from "@/type/CountdownType";
import ImgOrVideoRenderer from "../ImgOrVideoRenderer/ImgOrVideoRenderer";

const ModalCart = ({
  serverTimeLeft,
}: {
  serverTimeLeft: CountdownTimeType;
}) => {
  const [timeLeft, setTimeLeft] = useState(serverTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(countdownTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [activeTab, setActiveTab] = useState<string | undefined>("");
  const { isModalOpen, closeModalCart } = useModalCartContext();
  const { cartState, addToCart, removeFromCart, updateCart } = useCart();

  const handleAddToCart = (productItem: ProductType2) => {
    if (!cartState.cartArray.find((item) => item._id === productItem._id)) {
      addToCart({ ...productItem });
      updateCart(productItem._id, productItem.quantityPurchase, "", "");
    } else {
      updateCart(productItem._id, productItem.quantityPurchase, "", "");
    }
  };

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  let moneyForFreeship = 150;
  let [totalCart, setTotalCart] = useState<number>(0);
  let [discountCart, setDiscountCart] = useState<number>(0);

  cartState.cartArray.map(
    (item) => (totalCart += (item.discountPrice ?? item.price) * item.quantity)
  );

  return (
    <>
      <div className={`modal-cart-block`} onClick={closeModalCart}>
        <div
          className={`modal-cart-main flex ${isModalOpen ? "open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="right cart-block w-full py-6 relative overflow-hidden">
            <div className="heading px-6 pb-3 flex items-center justify-between relative">
              <div className="heading5">Shopping Cart</div>
              <div
                className="close-btn absolute right-6 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                onClick={closeModalCart}
              >
                <Icon.X size={14} />
              </div>
            </div>

            <div className="list-product px-6">
              {cartState.cartArray.map((product) => (
                <div
                  key={product._id}
                  className="item py-5 flex items-center justify-between gap-3 border-b border-line"
                >
                  <div className="infor flex items-center gap-3 w-full">
                    <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                      <ImgOrVideoRenderer
                        src={product.images[0]}
                        width={300}
                        height={300}
                        alt={product.productName}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className="name text-button">
                          {product.productName}
                        </div>
                        <div
                          className="remove-cart-btn caption1 font-semibold text-red underline cursor-pointer"
                          onClick={() => removeFromCart(product._id)}
                        >
                          Remove
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-3 w-full">
                        <div className="flex items-center text-secondary2 capitalize">
                          {product.selectedSize || product.inventory.sizes[0]}/
                          {product.selectedColor || product.inventory.colors[0]}
                        </div>
                        <div className="product-price text-title">
                          ₹{product.discountPrice ?? product.price}.00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="footer-modal bg-white absolute bottom-0 left-0 w-full">
              <div className="flex items-center justify-between pt-6 px-6">
                <div className="heading5">Subtotal</div>
                <div className="heading5">₹{totalCart}.00</div>
              </div>
              <div className="block-button text-center p-6">
                <div className="flex items-center gap-4">
                  <div
                    className="button-main basis-1/2 bg-white border border-black text-black text-center uppercase"
                    onClick={closeModalCart}
                  >
                    Or continue shopping
                  </div>
                  <Link
                    href={"/cart"}
                    className="button-main basis-1/2 text-center uppercase"
                    onClick={closeModalCart}
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart;
