"use client";
import { useStore } from "@/context/StoreContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DynamicTitle() {
  const { businessName } = useStore();
  useEffect(() => {
    document.title = businessName || "";
  }, []);

  return null;
}
