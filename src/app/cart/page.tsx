"use client";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import { countdownTime } from "@/store/countdownTime";
import ImgOrVideoRenderer from "@/components/ImgOrVideoRenderer/ImgOrVideoRenderer";
import { isUserLoggedIn } from "@/utils/utils";
import { useToaster } from "@/context/ToasterContext";

const Cart = () => {
  const [timeLeft, setTimeLeft] = useState(countdownTime());
  const [totalCart, setTotalCart] = useState(0);
  const [discountCart, setDiscountCart] = useState(0);
  const [shipCart, setShipCart] = useState(0);

  const router = useRouter();
  const { showToast } = useToaster();
  const { cartState, updateCart, removeFromCart } = useCart();

  const moneyForFreeship = 150;
  const applyCode = 0; // Static for now — should come from user input in real app

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(countdownTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let subtotal = 0;
    let discount = 0;

    cartState.cartArray.forEach((item) => {
      const effectivePrice = item.discountPrice ?? item.price;
      subtotal += effectivePrice * item.quantity;

      if (item.discountPrice) {
        discount += (item.price - item.discountPrice) * item.quantity;
      }
    });

    setTotalCart(subtotal);
    setDiscountCart(discount);

    if (cartState.cartArray.length === 0) {
      setShipCart(0);
    } else {
      setShipCart(subtotal < moneyForFreeship ? 30 : 0);
    }
  }, [cartState.cartArray]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const itemToUpdate = cartState.cartArray.find(
      (item) => item._id === productId
    );
    if (itemToUpdate) {
      updateCart(
        productId,
        newQuantity,
        itemToUpdate.selectedSize,
        itemToUpdate.selectedColor
      );
    }
  };

  const redirectToCheckout = () => {
    const user = isUserLoggedIn();
    if (!_.isEmpty(user)) {
      router.push(`/checkout?discount=${discountCart}&ship=${shipCart}`);
    } else {
      router.push(`/login`);
    }
  };

  const cardProducts = _.get(cartState, "cartArray", []);
  const isCartEmpty = _.isEmpty(cardProducts);

  return (
    <>
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
      </div>

      <div className="cart-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
            <div
              className={`${
                !isCartEmpty ? "xl:w-2/3" : "xl:w-full"
              } xl:pr-3 w-full`}
            >
              <div className="list-product w-full sm:mt-7 mt-5">
                <div className="heading bg-surface bora-4 pt-4 pb-4">
                  <div className="flex">
                    <div className="w-[50%] text-button text-center">
                      Products
                    </div>
                    <div className="w-[15%] text-button text-center">Price</div>
                    <div className="w-[15%] text-button text-center">
                      Quantity
                    </div>
                    <div className="w-[15%] text-button text-center">
                      Total Price
                    </div>
                    <div className="w-[5%] text-button text-center">Remove</div>
                  </div>
                </div>

                <div className="list-product-main w-full mt-3">
                  {isCartEmpty ? (
                    <p className="text-button pt-3">No product in cart</p>
                  ) : (
                    cardProducts.map((product) => (
                      <div
                        className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
                        key={product._id}
                      >
                        <div className="w-[50%] flex items-center gap-6">
                          <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                            <ImgOrVideoRenderer
                              src={product.images[0]}
                              width={1000}
                              height={1000}
                              alt={product.productName}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <div className="text-title w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                              {product.productName}
                            </div>
                          </div>
                        </div>

                        <div className="w-[15%] flex flex-col items-center justify-center">
                          {product.discountPrice ? (
                            <>
                              <div className="text-title text-center line-through opacity-60">
                                ₹{product.price}
                              </div>
                              <div className="text-title text-center text-red-600 font-semibold">
                                ₹{product.discountPrice}
                              </div>
                            </>
                          ) : (
                            <div className="text-title text-center">
                              ₹{product.price}
                            </div>
                          )}
                        </div>

                        <div className="w-[15%] flex items-center justify-center">
                          <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] w-20">
                            <Icon.Minus
                              onClick={() => {
                                if (product.quantity > 1) {
                                  handleQuantityChange(
                                    product._id,
                                    product.quantity - 1
                                  );
                                }
                              }}
                              className={`text-base max-md:text-sm ${
                                product.quantity === 1
                                  ? "opacity-40 pointer-events-none"
                                  : ""
                              }`}
                            />
                            <div className="text-button quantity">
                              {product.quantity}
                            </div>
                            <Icon.Plus
                              onClick={() =>
                                handleQuantityChange(
                                  product._id,
                                  product.quantity + 1
                                )
                              }
                              className="text-base max-md:text-sm"
                            />
                          </div>
                        </div>

                        <div className="w-[15%] flex items-center justify-center">
                          <div className="text-title text-center font-semibold">
                            ₹
                            {(
                              product.quantity *
                              (product.discountPrice ?? product.price)
                            ).toFixed(2)}
                          </div>
                        </div>

                        <div className="w-[5%] flex items-center justify-center">
                          <Icon.XCircle
                            className="text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-500"
                            onClick={() => removeFromCart(product._id)}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {!isCartEmpty && (
              <div className="xl:w-1/3 xl:pl-12 w-full">
                <div className="checkout-block bg-surface p-6 rounded-2xl">
                  <div className="heading5">Order Summary</div>

                  <div className="total-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Subtotal</div>
                    <div className="text-title">
                      ₹<span className="total-product">{totalCart}</span>.00
                    </div>
                  </div>

                  <div className="total-cart-block pt-4 pb-4 flex justify-between">
                    <div className="heading5">Total</div>
                    <div className="heading5">
                      ₹<span className="total-cart heading5">{totalCart}</span>{" "}
                      <span className="heading5">.00</span>
                    </div>
                  </div>

                  <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                    <div
                      aria-disabled={isCartEmpty}
                      className={`checkout-btn button-main text-center w-full ${
                        isCartEmpty ? "disabled opacity-50" : ""
                      }`}
                      onClick={!isCartEmpty ? redirectToCheckout : undefined}
                    >
                      Proceed To Checkout
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
