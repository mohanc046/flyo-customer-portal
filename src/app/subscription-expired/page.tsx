"use client";

import React from "react";
import Image from "next/image";
import "./SubscriptionExpired.scss";
import { getStoreInfo } from "@/utils/utils";

const SubscriptionExpired = () => {
  const storeName = getStoreInfo()?.businessName || "Our store";

  return (
    <div className="subscription-expired-container">
      <div className="subscription-card">
        <Image
          src="/gifs/expired.gif"
          alt="Subscription Expired"
          className="expired-gif"
          width={300}
          height={300}
          priority
        />
        <h2 className="expired-title">We&apos;ll Be Right Back</h2>
        <p className="expired-text">
          {storeName} is currently undergoing maintenance. Thank you for your
          patience — we’ll be back shortly.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionExpired;
