"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userInfo");
    sessionStorage.clear();
    router.push("/login");
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Logging Out...</h1>
      <p>Please wait while we log you out.</p>
    </div>
  );
};

export default Logout;
