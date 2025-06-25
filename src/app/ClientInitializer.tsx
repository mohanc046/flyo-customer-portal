"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ClientInitializer = () => {
  const router = useRouter();

  useEffect(() => {
    try {
      const storeInfo = JSON.parse(localStorage.getItem("storeInfo") || "{}");
      if (storeInfo?.isActive === false) {
        router.push("/subscription-expired");
      }
    } catch (error) {
      console.error("Invalid storeInfo in localStorage:", error);
    }
  }, []);

  return null;
};

export default ClientInitializer;
