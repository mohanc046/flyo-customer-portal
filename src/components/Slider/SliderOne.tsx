"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import { useStore } from "@/context/StoreContext";
import ImgRenderer from "../ImgOrVideoRenderer/ImgRenderer";

const SliderOne = () => {
  const { banners } = useStore();

  // Ensure only valid banners are passed
  const validBanners = banners.filter(
    (banner) => banner !== null && banner.trim() !== ""
  );

  return (
    <div className="slider-block style-one w-full lg:h-[75vh] md:h-[60vh] sm:h-[40vh]">
      <div className="slider-main h-full w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="h-full relative"
          autoplay={{
            delay: 4000,
          }}
        >
          {validBanners.length > 0 ? (
            validBanners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="slider-item h-full w-full relative">
                  <ImgRenderer
                    src={banner}
                    className="h-full w-full object-cover"
                    description={`Banner ${index + 1}`}
                    objectFit={"contain"}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">No banners available</p>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderOne;
