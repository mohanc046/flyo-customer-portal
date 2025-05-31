"use client";
import React, { useState, useEffect, useMemo } from "react";
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
  const [voucherCode, setVoucherCode] = useState("");
  const [hasVoucherApplied, setHasVoucherApplied] = useState(false);
  const [manualDiscount, setManualDiscount] = useState(0);

  const moneyForFreeship = 150;
  const minVoucherThreshold = 200;
  const discountValue = 30;

  const router = useRouter();
  const { showToast } = useToaster();
  const { cartState, updateCart, removeFromCart } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(countdownTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cardProducts = _.get(cartState, "cartArray", []);
  const isCartEmpty = _.isEmpty(cardProducts);

  const totals = useMemo(() => {
    let totalCart = 0;
    let discountCart = 0;

    cardProducts.forEach((item) => {
      const price = item.price;
      const finalPrice = item.discountPrice ?? item.price;
      const quantity = item.quantity;

      totalCart += price * quantity;
      discountCart += (price - finalPrice) * quantity;
    });

    const eligibleForShip =
      totalCart < moneyForFreeship && cardProducts.length > 0;
    const shipCart = eligibleForShip ? 30 : 0;

    return {
      totalCart,
      discountCart: discountCart + manualDiscount,
      shipCart,
      totalAfterDiscount:
        totalCart - discountCart - manualDiscount + (eligibleForShip ? 30 : 0),
    };
  }, [cardProducts, manualDiscount]);

  const handleQuantityChange = (productId: any, newQuantity: any) => {
    const item = cardProducts.find((p) => p._id === productId);
    if (item && newQuantity >= 1) {
      updateCart(productId, newQuantity, item.selectedSize, item.selectedColor);
    }
  };

  const handleApplyCode = () => {
    if (hasVoucherApplied) {
      showToast("Voucher already applied.", "info");
      return;
    }

    if (totals.totalCart >= minVoucherThreshold) {
      setManualDiscount(discountValue);
      setHasVoucherApplied(true);
      showToast("Voucher applied!", "success");
    } else {
      showToast(
        `Minimum order must be ₹${minVoucherThreshold} to apply this code.`,
        "error"
      );
    }
  };

  const redirectToCheckout = () => {
    const user = isUserLoggedIn();
    if (!_.isEmpty(user)) {
      router.push(
        `/checkout?discount=${totals.discountCart}&ship=${totals.shipCart}&total=${totals.totalCart}`
      );
    } else {
      router.push(`/login`);
    }
  };

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
                !isCartEmpty ? "xl:w-2/3" : "xl:w-3/3"
              } xl:pr-3 w-full`}
            >
              {/* Cart List */}
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
                        key={product._id}
                        className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
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
                              onClick={() =>
                                handleQuantityChange(
                                  product._id,
                                  product.quantity - 1
                                )
                              }
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

              {/* Voucher Input */}
              {!isCartEmpty && (
                <div className="input-block discount-code w-full h-12 sm:mt-7 mt-5">
                  <form
                    className="w-full h-full relative"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleApplyCode();
                    }}
                  >
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      placeholder="Add voucher discount"
                      className="w-full h-full bg-surface pl-4 pr-14 rounded-lg border border-line"
                    />
                    <button
                      type="submit"
                      className="button-main absolute top-1 bottom-1 right-1 px-5 rounded-lg flex items-center justify-center"
                    >
                      Apply Code
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Summary Sidebar */}
            {!isCartEmpty && (
              <div className="xl:w-1/3 xl:pl-12 w-full">
                <div className="checkout-block bg-surface p-6 rounded-2xl">
                  <div className="heading5">Order Summary</div>
                  <div className="py-5 flex justify-between border-b border-line">
                    <div className="text-title">Subtotal</div>
                    <div className="text-title">₹{totals.totalCart}.00</div>
                  </div>
                  <div className="py-5 flex justify-between border-b border-line">
                    <div className="text-title">Discounts</div>
                    <div className="text-title">₹-{totals.discountCart}.00</div>
                  </div>
                  <div className="pt-4 pb-4 flex justify-between">
                    <div className="heading5">Total</div>
                    <div className="heading5">
                      ₹{(totals.totalCart - totals.discountCart).toFixed(2)}
                    </div>
                  </div>

                  <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                    <div
                      className={`checkout-btn button-main text-center w-full ${
                        isCartEmpty ? "disabled" : ""
                      }`}
                      onClick={redirectToCheckout}
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
