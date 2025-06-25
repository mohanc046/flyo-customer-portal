import React from "react";
import "./SubscriptionExpired.scss";

const SubscriptionExpired = () => {
  return (
    <div className="subscription-expired-container">
      <div className="subscription-card">
        <img
          src="/gifs/expired.gif"
          alt="Subscription Expired"
          className="expired-gif"
        />
        <h2 className="expired-title">Oops! Subscription Expired</h2>
        <p className="expired-text">
          Your access has expired. Everything's still here — just waiting for
          you to come back.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionExpired;
