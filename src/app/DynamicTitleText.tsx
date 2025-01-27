"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DynamicTitleText() {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(""); // Default title

  useEffect(() => {
    const store = searchParams.get("store") || "FlyoFashion";
    setTitle(store); // Update the state
    document.title = store;
  }, [searchParams]);

  return title;
}
