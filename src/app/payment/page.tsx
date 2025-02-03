"use client";
import React, { useEffect, useState } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getStripePublishableKey } from "@/utils/api.service";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    try {
      setLoading(true);
      const validation = await elements.submit();
      if (validation.error) {
        setLoading(false);
        console.error("Validation error:", validation.error.message);
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/orders`,
        },
      });
      setLoading(false);

      if (error) {
        console.error("Payment error:", error.message);
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
    <form onSubmit={handleSubmit}>
      <div className="container">
        <PaymentElement />
      </div>
      <div className="container mt-5">
        <button
          type="submit"
          className={`button-main2 flex items-center justify-center`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Complete Payment"}
        </button>
      </div>
    </form>
  );
};

const Payment = () => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("client_secret") || "";

  useEffect(() => {
    const fetchKeyAndInitializeStripe = async () => {
      try {
        const stripeKey = await fetchStripeKey();
        const stripeInstance = loadStripe(stripeKey);
        setStripePromise(stripeInstance);
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
        <Breadcrumb heading="Payment" subHeading="Payment" />
      </div>
      <div className="cart-block md:py-20 py-10">
        {stripePromise && clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
        ) : (
          <p>Loading payment options...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Payment;
