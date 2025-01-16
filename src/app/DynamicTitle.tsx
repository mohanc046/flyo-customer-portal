"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DynamicTitle() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const store = searchParams.get("store") || "FlyoFashion";
    document.title = store; // Set the document title dynamically
  }, [searchParams]);

  return null; // This component does not render anything
}
