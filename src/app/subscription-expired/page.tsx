"use client";

import React from "react";
import Image from "next/image";
import "./SubscriptionExpired.scss";

const SubscriptionExpired = () => {
  return (
    <div className="subscription-expired-container">
      <div className="subscription-card">
        <Image
          src="/gifs/expired.gif"
          alt="Subscription Expired"
          className="expired-gif"
          width={300}
          height={300}
          priority // Optional: Optimizes for LCP
        />
        <h2 className="expired-title">Oops! Subscription Expired</h2>
        <p className="expired-text">
          Your access has expired. Everything&apos;s still here — just waiting
          for you to come back.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionExpired;
