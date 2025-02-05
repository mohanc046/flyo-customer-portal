"use client";

import React from "react";
import { useToaster } from "@/context/ToasterContext";
import "./Toaster.scss"; // Import SCSS styles
import { motion } from "framer-motion"; // For smooth animations

const Toaster = () => {
  const { toasts, removeToast } = useToaster();

  return (
    <div className="toaster-container">
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className={`toaster-message toaster-${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          <span className="toaster-icon">
            {toast.type === "success" ? "✅" : toast.type === "error" ? "❌" : ""}
          </span>
          <span className="toaster-text">{toast.message}</span>
          <div className="toaster-progress"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default Toaster;
