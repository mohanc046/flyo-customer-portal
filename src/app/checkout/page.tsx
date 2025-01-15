"use client";
import React, { useEffect, useState } from "react";
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
import { getServiceURL } from "@/utils/utils";
import axios from "axios";
import { createOrder } from "@/utils/api.service";

const stripePromise = loadStripe("your-stripe-publishable-key");

// const Checkout = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const searchParams = useSearchParams();
//   let discount = searchParams.get("discount");
//   let ship = searchParams.get("ship");
//   const [shippingAddress, setShippingAddress] = useState({
//     doorNo: "",
//     address1: "",
//     address2: "",
//     pinCode: "",
//   });

//   const { cartState } = useCart();
//   let [totalCart, setTotalCart] = useState<number>(0);
//   const [activePayment, setActivePayment] = useState<string>("stripe");

//   cartState.cartArray.map((item) => (totalCart += item.price * item.quantity));

//   const handlePayment = (item: string) => {
//     setActivePayment(item);
//   };

//   const handleChange = (e: string) => {
//     const { id, value } = e.target;
//     setShippingAddress((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       console.error("Stripe has not loaded yet.");
//       return;
//     }

//     try {
//       // Trigger form validation in Stripe elements
//       const validation = await elements.submit();
//       if (validation.error) {
//         console.error(validation.error.message);
//         return;
//       }

//       // Example: Replace this with how you retrieve your token
//       const token = localStorage.getItem("authToken");

//       // Call the reusable API function
//       const { client_secret: clientSecret } = await createOrder(
//         shippingAddress,
//         totalCart - discount + ship,
//       );

//       const { error } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: `${window.location.origin}/payment/success`,
//         },
//       });

//       if (error) {
//         console.error("Payment error:", error.message);
//       }
//     } catch (error) {
//       console.error("Error submitting payment:", error);
//     }
//   };

//   return (
//     <>
//       <TopNavOne
//         props="style-one bg-black"
//         slogan="New customers save 10% with the code GET10"
//       />
//       <div id="header" className="relative w-full">
//         <MenuOne props="bg-transparent" />
//         <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
//       </div>

//       <Footer />
//     </>
//   );
// };

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const { cartState } = useCart();

  const discount = Number(searchParams.get("discount") || 0);
  const ship = Number(searchParams.get("ship") || 0);
  const [shippingAddress, setShippingAddress] = useState({
    doorNo: "",
    address1: "",
    address2: "",
    pinCode: "",
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
      // Trigger form validation in Stripe elements
      const validation = await elements.submit();
      if (validation.error) {
        console.error(validation.error.message);
        return;
      }

      // Example: Replace this with how you retrieve your token
      const token = localStorage.getItem("authToken");

      // Call the reusable API function
      const { client_secret: clientSecret } = await createOrder(
        shippingAddress,
        totalCart - discount + ship,
      );

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });

      if (error) {
        console.error("Payment error:", error.message);
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };
  return (
    <div className="cart-block md:py-20 py-10">
      <div className="container">
        <div className="content-main flex justify-between">
          <div className="left w-1/2">
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
                        id="address1"
                        type="text"
                        placeholder="Address 1 (street) *"
                        value={shippingAddress.address1}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="address2"
                        type="text"
                        placeholder="Address 1 (city and state) *"
                        value={shippingAddress.address2}
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
                  <div className="block-button md:mt-10 mt-6">
                    <button type="submit" className="button-main2 w-full">
                      Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="right w-5/12">
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

const Checkout = () => (
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
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
    <Footer />
  </>
);

export default Checkout;
