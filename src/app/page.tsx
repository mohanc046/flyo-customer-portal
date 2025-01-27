"use client";

import React, { useEffect } from "react";
import MenuOne from "@/components/Header/Menu/MenuOne";
import SliderOne from "@/components/Slider/SliderOne";
import WhatNewOne from "@/components/Home1/WhatNewOne";
import Collection from "@/components/Home1/Collection";
import Benefit from "@/components/Home1/Benefit";
import testimonialData from "@/data/Testimonial.json";
import Testimonial from "@/components/Home1/Testimonial";
import Footer from "@/components/Footer/Footer";
import { useSearchParams } from "next/navigation";
import { fetchStoreInfo } from "@/utils/api.service";
import { useStore } from "@/context/StoreContext";
import { getDomainName } from "@/utils/utils";

export default function Home() {
  const searchParams = useSearchParams();
  const { setStoreData, setIsLoading } = useStore();
  const storeName = getDomainName();
  useEffect(() => {
    if (storeName) {
      setIsLoading(true);
      fetchStoreInfo(storeName)
        .then((storeData) => {
          setStoreData(storeData);
        })
        .catch((error) => {
          console.error("Error fetching store info:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <>
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <SliderOne />
      </div>
      <WhatNewOne start={0} limit={4} storeName={storeName} />
      <Collection />
      <Benefit props="md:py-20 py-10" />
      <Testimonial data={testimonialData} limit={6} />
      <Footer />
    </>
  );
}
