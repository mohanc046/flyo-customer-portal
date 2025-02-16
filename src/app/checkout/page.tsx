"use client";
import React, { useEffect, useRef, useState } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";
import ImgOrVideoRenderer from "@/components/ImgOrVideoRenderer/ImgOrVideoRenderer";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder, getStripePublishableKey } from "@/utils/api.service";
import { useStore } from "@/context/StoreContext";
import { Spinner } from "@phosphor-icons/react";
import { useToaster } from "@/context/ToasterContext";

const CheckoutForm = ({ setClientSceret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const { cartState, setLoading } = useCart();
  const { storeData } = useStore();
  const { showToast } = useToaster();
  const status = searchParams.get("redirect_status") || null;
  const toastShown = useRef(false);
  useEffect(() => {
    if (status === "succeeded" && !toastShown.current) {
      showToast("Order Placed", "success");
      toastShown.current = true; // Mark as shown to prevent duplicate
    }
  }, [status]);

  const discount = Number(searchParams.get("discount") || 0);
  const ship = Number(searchParams.get("ship") || 0);
  const [shippingAddress, setShippingAddress] = useState({
    doorNo: "",
    street: "",
    pinCode: "",
    state: "",
  });

  const [activePayment, setActivePayment] = useState<string>("stripe");
  const [totalCart, setTotalCart] = useState<number>(0);

  useEffect(() => {
    const cartTotal = cartState.cartArray.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalCart(cartTotal);
  }, [cartState.cartArray]);

  const handlePayment = (item: string) => {
    setActivePayment(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setShippingAddress((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    try {
      setLoading(true);
      // Trigger form validation in Stripe elements
      const validation = await elements.submit();
      if (validation.error) {
        setLoading(false);
        console.error("Validation error:", validation.error.message);
        return;
      }

      // Extract products from cartState
      const products = cartState.cartArray.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
      }));

      const storeId = storeData?.store?._id;

      // Create the order
      const { client_secret } = await createOrder(
        shippingAddress,
        totalCart - discount + ship,
        products,
        storeId
      );

      setClientSceret(client_secret);

      // Confirm payment using Stripe
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: window.location.href, // Redirect to the current page
        },
      });

      setLoading(false);

      if (error) {
        console.error("Payment error:", error.message);
        showToast("Payment Failed", "error");
      } else {
        console.log("Payment successful");
      }
    } catch (error: any) {
      console.error(
        "Error submitting payment:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-block md:py-20 py-10">
      <div className="container">
        <div className="content-main flex justify-between">
          <div className="left lg:w-1/2">
            <div className="information">
              <div className="heading5">Shipping Address</div>
              <div className="form-checkout mt-5">
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
                    <div>
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="doorNo"
                        type="text"
                        placeholder="Door No *"
                        value={shippingAddress.doorNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="street"
                        type="text"
                        placeholder="Address 1 (street) *"
                        value={shippingAddress.street}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="state"
                        type="text"
                        placeholder="Address 1 (city and state) *"
                        value={shippingAddress.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="pinCode"
                        type="text"
                        placeholder="Pin Code *"
                        value={shippingAddress.pinCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="payment-block md:mt-10 mt-6">
                    <div className="heading5">Choose payment Option:</div>
                    <div className="list-payment mt-5">
                      <div
                        className={`type bg-surface p-5 border border-line rounded-lg mt-5 ${
                          activePayment === "stripe" ? "open" : ""
                        }`}
                      >
                        <input
                          className="cursor-pointer"
                          type="radio"
                          id="stripe"
                          name="payment"
                          checked={activePayment === "stripe"}
                          onChange={() => handlePayment("stripe")}
                        />
                        <label
                          className="text-button pl-2 cursor-pointer"
                          htmlFor="stripe"
                        >
                          Stripe
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`block-button md:mt-10 mt-6 ${
                      cartState.isLoading
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    <button
                      type="submit"
                      className={`button-main2 w-full flex items-center justify-center`}
                      disabled={cartState.isLoading} // Disable button during loading
                    >
                      {cartState.isLoading ? (
                        <Spinner className="spinner" />
                      ) : (
                        "Payment"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="right lg:w-12/12 mb-5">
            <div className="checkout-block">
              <div className="heading5 pb-3">Your Order</div>
              <div className="list-product-checkout">
                {cartState.cartArray.length < 1 ? (
                  <p className="text-button pt-3">No product in cart</p>
                ) : (
                  cartState.cartArray.map((product) => (
                    <>
                      <div className="item flex items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
                        <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                          <ImgOrVideoRenderer
                            src={product.images[0]}
                            width={500}
                            height={500}
                            alt="img"
                            className="w-full h-full"
                          />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="name text-title">
                              {product.productName}
                            </div>
                            <div className="caption1 text-secondary mt-2">
                              <span className="size capitalize">
                                {product.selectedSize ||
                                  product.inventory.sizes[0]}
                              </span>
                              <span>/</span>
                              <span className="color capitalize">
                                {product.selectedColor ||
                                  product.inventory.colors}
                              </span>
                            </div>
                          </div>
                          <div className="text-title">
                            <span className="quantity">{product.quantity}</span>
                            <span className="px-1">x</span>
                            <span>₹{product.price}.00</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                )}
              </div>
              <div className="discount-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Discounts</div>
                <div className="text-title">
                  -₹<span className="discount">{discount}</span>
                  <span>.00</span>
                </div>
              </div>
              <div className="ship-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Shipping</div>
                <div className="text-title">
                  {Number(ship) === 0 ? "Free" : `₹${ship}.00`}
                </div>
              </div>
              <div className="total-cart-block pt-5 flex justify-between">
                <div className="heading5">Total</div>
                <div className="heading5 total-cart">
                  ₹{totalCart - Number(discount) + Number(ship)}.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeyAndInitializeStripe = async () => {
      try {
        const stripeKey = await fetchStripeKey();
        const stripe = loadStripe(stripeKey);
        setStripePromise(stripe);
      } catch (error) {
        console.error("Error initializing Stripe:", error);
      }
    };

    fetchKeyAndInitializeStripe();
  }, []);

  const fetchStripeKey = async () => {
    try {
      const response = await getStripePublishableKey();
      return response.configuration.publishableKey;
    } catch (error) {
      console.error("Error fetching Stripe publishable key:", error);
      throw error;
    }
  };

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
      </div>
      <div className="cart-block md:py-20 py-10">
        <div className="container">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret:
                clientSecret ||
                "pi_3Qht0VETfYJwWWxs06oFcVfK_secret_wah12ufki8yPwfaTYJtykWuiR",
            }}
          >
            <PaymentElement />
            <CheckoutForm setClientSceret={setClientSecret} />
          </Elements>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
