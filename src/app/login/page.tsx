"use client";
import React, { useState } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import GoogleOAuthLogin from "./buttons/google";
import FacebookOAuthLogin from "./buttons/facebook";
import Image from "next/image";
import { config } from "../../config";
import { useLogin } from "@/context/LoginContext";
import { Spinner } from "@phosphor-icons/react";
import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { isLoading, initiateLoginWithEmail, verifyLoginOTP } = useLogin();
  const { storeData } = useStore();
  const [state, setState] = useState({
    email: "",
    otp: "",
    screen: "EMAIL", // Determines if user is on the "EMAIL" or "OTP" screen
    title: "Login",
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.email) return;
    await initiateLoginWithEmail({
      email: state.email,
      setState,
    });
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.otp) return;
    await verifyLoginOTP({
      state,
      navigateToDashboard: () => {
        router.push(`/?store=${storeData?.store?.businessName}`);
      },
    });
  };

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Login" subHeading="Login" />
      </div>
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 justify-center">
            <div className="left md:w-[600px] sm:w-[400px] lg:pr-[60px] md:pr-[40px]">
              <div className="heading4">{state.title}</div>

              {/* Email Screen */}
              {state.screen === "EMAIL" && (
                <form className="md:mt-7 mt-4" onSubmit={handleEmailSubmit}>
                  <div className="email">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="username"
                      type="email"
                      placeholder="Email"
                      value={state.email}
                      onChange={(e) =>
                        setState((prev) => ({ ...prev, email: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div
                    className={`block-button md:mt-7 mt-4 ${
                      isLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <button className="button-main" disabled={isLoading}>
                      {isLoading ? <Spinner className="spinner" /> : "Send OTP"}
                    </button>
                  </div>
                </form>
              )}

              {/* OTP Screen */}
              {state.screen === "OTP" && (
                <form className="md:mt-7 mt-4" onSubmit={handleOTPSubmit}>
                  <div className="otp">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={state.otp}
                      onChange={(e) =>
                        setState((prev) => ({ ...prev, otp: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div
                    className={`block-button md:mt-7 mt-4 ${
                      isLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <button className="button-main" disabled={isLoading}>
                      {isLoading ? (
                        <Spinner className="spinner" />
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  </div>
                </form>
              )}

              <div className="d-flex flex-column align-items-center text-center my-3">
                <div className="flex flex-col items-center mt-5">
                  <h5 className="mb-2">Or</h5>
                  <h5 className="mb-3">Get started with</h5>
                  <div className="flex justify-center gap-5">
                    <span className="cursor-pointer">
                      <Image
                        src={config.APPLE}
                        height={50}
                        width={50}
                        alt="apple"
                      />
                    </span>
                    <span className="cursor-pointer">
                      <GoogleOAuthLogin />
                    </span>
                    <span className="cursor-pointer">
                      <FacebookOAuthLogin />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
