"use client";

import React, { useEffect } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
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
import { debounce } from "lodash";
import _ from "lodash";
import ReactGA from "react-ga";

export default function Home() {
  const searchParams = useSearchParams();
  const { setStoreData, setIsLoading } = useStore();
  const storeName = getDomainName();

  const shopInformation = localStorage.getItem("storeInfo");

  const { pluginConfig = {}, storeInformation: exisintgShopInformation = {} } =
    JSON.parse(shopInformation) ?? {};

  const {
    propertyId = null,
    widgetId = null,
    isActive = false,
  } = _.get(pluginConfig, "tawk", {});

  const {
    propertyId: googleAnalyticsTrackingId = null,
    isActive: isGoogleAnalyticsActive = false,
  } = _.get(pluginConfig, "googleAnalytics", {});

  const {
    phoneNumber = null,
    isActive: isWhatsAppActive = false,
    userName = "",
  } = _.get(pluginConfig, "whatsApp", {});

  useEffect(() => {
    if (!_.isEmpty(googleAnalyticsTrackingId) && isGoogleAnalyticsActive) {
      ReactGA.initialize(`${googleAnalyticsTrackingId}`);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, [googleAnalyticsTrackingId, isGoogleAnalyticsActive]);

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      if (getDomainName()) {
        setIsLoading(true);
        fetchStoreInfo(storeName)
          .then((storeData) => {
            setStoreData(storeData);
            localStorage.setItem("storeInfo", JSON.stringify(storeData?.store));
          })
          .catch((error) => {
            console.error("Error fetching store info:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, 500); // 300ms debounce delay

    debouncedFetch(); // Call the debounced function

    return () => {
      debouncedFetch.cancel(); // Cleanup debounce on unmount or dependency change
    };
  }, [getDomainName()]); // Re-run effect when `storeName` changes

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
      {propertyId && widgetId && isActive && (
        <TawkMessengerReact propertyId={propertyId} widgetId={widgetId} />
      )}

      {phoneNumber && isWhatsAppActive && userName && (
        <FloatingWhatsApp
          phoneNumber={`${phoneNumber}`}
          accountName={`${userName}`}
        />
      )}
    </>
  );
}
